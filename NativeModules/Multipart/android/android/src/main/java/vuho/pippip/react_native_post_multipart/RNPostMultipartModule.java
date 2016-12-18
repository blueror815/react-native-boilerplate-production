package vuho.pippip.react_native_post_multipart;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.Handler;
import android.util.Base64;
import android.util.Base64OutputStream;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NoSuchKeyException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.squareup.okhttp.Call;
import com.squareup.okhttp.Headers;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.MultipartBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by vuho on 2/23/16.
 */

class MyTaskParams {
    ReadableMap postData;
    ReactApplicationContext reactContext;

    MyTaskParams(ReadableMap postData, ReactApplicationContext reactContext) {
        this.postData = postData;
        this.reactContext = reactContext;
    }
}

public class RNPostMultipartModule extends ReactContextBaseJavaModule {
    private final OkHttpClient client = new OkHttpClient();
    private final Handler handler;
    private String TAG = "RNPostMultipartModule";
    private com.facebook.react.bridge.Callback completeCallback;
    private Call currentCall;

    public RNPostMultipartModule(ReactApplicationContext reactContext) {
        super(reactContext);
        handler = new Handler(reactContext.getMainLooper());
    }

    @Override
    public String getName() {
        return "RNPostMultipart";
    }

    @ReactMethod
    public void postMultipartBase64(ReadableMap postData, com.facebook.react.bridge.Callback complete) {
        Log.e(TAG, "Begin post Multipart");
        completeCallback = complete;
        new PostMultipartBase64().execute(postData);
    }

    @ReactMethod
    public void postMultipartWithProgress(ReadableMap postData, com.facebook.react.bridge.Callback complete) {
        Log.e(TAG, "Begin post Multipart With Progress");
        completeCallback = complete;
        MyTaskParams params = new MyTaskParams(postData, this.getReactApplicationContext());
        new PostMultipartWithProgress().execute(params);
    }

    @ReactMethod
    public void cancelCurrentRequest(com.facebook.react.bridge.Callback complete) {
        if(currentCall != null)
            if(!currentCall.isCanceled())
                currentCall.cancel();
        complete.invoke(null, null);
    }

    public String compressImage(String imageData) {
        Bitmap scaledBitmap = null;

        BitmapFactory.Options options = new BitmapFactory.Options();

//      by setting this field as true, the actual bitmap pixels are not loaded in the memory. Just the bounds are loaded. If
//      you try the use the bitmap here, you will get null.
        options.inJustDecodeBounds = true;
        byte[] decodedString = Base64.decode(imageData, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length, options);
//        Bitmap bmp = BitmapFactory.decodeFile(imageData, options);

        int actualHeight = options.outHeight;
        int actualWidth = options.outWidth;

//      max Height and width values of the compressed image is taken as 816x612

        float maxHeight = 1024.0f;
        float maxWidth = 1024.0f;
        float imgRatio = actualWidth / actualHeight;
        float maxRatio = maxWidth / maxHeight;

//      width and height values are set maintaining the aspect ratio of the image

        if (actualHeight > maxHeight || actualWidth > maxWidth) {
            if (imgRatio < maxRatio) {
                imgRatio = maxHeight / actualHeight;
                actualWidth = (int) (imgRatio * actualWidth);
                actualHeight = (int) maxHeight;
            } else if (imgRatio > maxRatio) {
                imgRatio = maxWidth / actualWidth;
                actualHeight = (int) (imgRatio * actualHeight);
                actualWidth = (int) maxWidth;
            } else {
                actualHeight = (int) maxHeight;
                actualWidth = (int) maxWidth;
            }
        }

//      setting inSampleSize value allows to load a scaled down version of the original image

        options.inSampleSize = calculateInSampleSize(options, actualWidth, actualHeight);

//      inJustDecodeBounds set to false to load the actual bitmap
        options.inJustDecodeBounds = false;

//      this options allow android to claim the bitmap memory if it runs low on memory
        options.inPurgeable = true;
        options.inInputShareable = true;
        options.inTempStorage = new byte[16 * 1024];

        try {
//          load the bitmap from its path
//            bmp = BitmapFactory.decodeFile(imageData, options);

            decodedString = Base64.decode(imageData, Base64.DEFAULT);
            bmp = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length, options);
        } catch (OutOfMemoryError exception) {
            exception.printStackTrace();

        }
        try {
            scaledBitmap = Bitmap.createBitmap(actualWidth, actualHeight,Bitmap.Config.ARGB_8888);
        } catch (OutOfMemoryError exception) {
            exception.printStackTrace();
        }

        float ratioX = actualWidth / (float) options.outWidth;
        float ratioY = actualHeight / (float) options.outHeight;
        float middleX = actualWidth / 2.0f;
        float middleY = actualHeight / 2.0f;

        Matrix scaleMatrix = new Matrix();
        scaleMatrix.setScale(ratioX, ratioY, middleX, middleY);

        Canvas canvas = new Canvas(scaledBitmap);
        canvas.setMatrix(scaleMatrix);
        canvas.drawBitmap(bmp, middleX - bmp.getWidth() / 2, middleY - bmp.getHeight() / 2, new Paint(Paint.FILTER_BITMAP_FLAG));

//      check the rotation of the image and display it properly
        Matrix matrix = new Matrix();
        scaledBitmap = Bitmap.createBitmap(scaledBitmap, 0, 0,
                scaledBitmap.getWidth(), scaledBitmap.getHeight(), matrix,
                true);

        FileOutputStream out = null;
        String filename = getFilename();
        try {
            out = new FileOutputStream(filename);

//          write the compressed bitmap at the destination specified by filename.
            scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 50, out);
            FileInputStream fin = new FileInputStream(filename);
            return getBase64StringFromOutputStream(fin);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public String getFilename() {
        File file = new File(Environment.getExternalStorageDirectory().getPath(), "pippip/images");
        if (!file.exists()) {
            file.mkdirs();
        }
        String uriSting = (file.getAbsolutePath() + "/" + System.currentTimeMillis() + ".jpg");
        return uriSting;

    }

    public int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;

        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = Math.round((float) height / (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        final float totalPixels = width * height;
        final float totalReqPixelsCap = reqWidth * reqHeight * 2;
        while (totalPixels / (inSampleSize * inSampleSize) > totalReqPixelsCap) {
            inSampleSize++;
        }

        return inSampleSize;
    }

    public String getBase64StringFromOutputStream(FileInputStream fin) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        Base64OutputStream base64out = new Base64OutputStream(os,Base64.NO_WRAP);

        byte[] buffer = new byte[3 * 512];
        int len = 0;
        while ((len = fin.read(buffer)) >= 0) {
            base64out.write(buffer, 0, len);
        }

        System.out.println("Encoded Size:" + os.size());

        base64out.flush();
        base64out.close();//this did the tricks. Please see explanation.

        return new String(os.toByteArray(), "UTF-8");
    }

    public class PostMultipartBase64 extends AsyncTask<ReadableMap, Void, Void> {
        @Override
        protected Void doInBackground(ReadableMap... params) {
            try {
                ReadableMap postData = params[0];

                String url = postData.getString("url");
                String imageKey = postData.getString("imageKey");
                String imageData = postData.getString("imageData");
                String imageName = postData.getString("imageName");
                String compressedImageData = imageData; // Disable compressed Image

                //Get all headers
                ReadableMap headerMap = postData.getMap("headers");
                Headers.Builder headerBuilder = new Headers.Builder();
                ReadableMapKeySetIterator headerIterator = headerMap.keySetIterator();
                while (headerIterator.hasNextKey()) {
                    try {
                        String key = headerIterator.nextKey();
                        String value = headerMap.getString(key);
                        headerBuilder.add(key, value);
                    } catch (NoSuchKeyException e) {
                        e.printStackTrace();
                    }
                }

                MultipartBuilder multipartBuilder = new MultipartBuilder()
                        .type(MultipartBuilder.FORM)
                        .addPart(
                                Headers.of("Content-Disposition",
                                        String.format("form-data; name=\"%s\"; filename=\"%s\"", imageKey, imageName)
                                ),
                                RequestBody.create(MediaType.parse("image/jpeg"), Base64.decode(compressedImageData, Base64.DEFAULT))
                        );

                if (postData.hasKey("parameters")) {
                    ReadableMap parameterMap = postData.getMap("parameters");
                    ReadableMapKeySetIterator paramsIterator = parameterMap.keySetIterator();
                    while (paramsIterator.hasNextKey()) {
                        try {
                            String key = paramsIterator.nextKey();
                            ReadableType tyle = parameterMap.getType(key);
                            String value;

                            switch (tyle) {
                                case Boolean:
                                    value = String.valueOf(parameterMap.getBoolean(key));
                                    break;
                                case Number:
                                    value = String.valueOf(parameterMap.getDouble(key));
                                    break;
                                default:
                                    value = String.valueOf(parameterMap.getString(key));
                                    break;
                            }

                            multipartBuilder.addPart(
                                    Headers.of("Content-Disposition", "form-data; name=\"" + key + "\""),
                                    RequestBody.create(null, value));
                        } catch (NoSuchKeyException e) {
                            e.printStackTrace();
                        }
                    }
                }

                Request request = new Request.Builder()
                        .headers(headerBuilder.build())
                        .url(url)
                        .post(multipartBuilder.build())
                        .build();

                Response response = client.newCall(request).execute();
                if (!response.isSuccessful()) {
                    Log.e(TAG, "Unexpected code" + response);
                    completeCallback.invoke(response, null);
                    return null;
                }

                String responseStr = response.body().string();
                completeCallback.invoke(null, responseStr);

                Log.e(TAG, "End post Multipart");
            } catch (Exception e) {
                e.printStackTrace();
                completeCallback.invoke(e.getMessage(), null);
            }
            return null;
        }
    }

    public class PostMultipartWithProgress extends AsyncTask<MyTaskParams, Void, Void> {
        @Override
        protected Void doInBackground(MyTaskParams... params) {
            try {
                Log.e("POST_MULTIPART","======= Go to asyntask =========");
                ReadableMap postData = params[0].postData;
                final ReactApplicationContext reactContext = params[0].reactContext;

                String url = postData.getString("url");
                String imageKey = postData.getString("imageKey");
                String imageData = postData.getString("imageData");
                String imageName = postData.getString("imageName");

                Log.e("POST_MULTIPART","======= Get data complete =========");

                String compressedImageData = imageData; // Disable compressed Image

                //Get all headers
                ReadableMap headerMap = postData.getMap("headers");
                Headers.Builder headerBuilder = new Headers.Builder();
                ReadableMapKeySetIterator headerIterator = headerMap.keySetIterator();
                while (headerIterator.hasNextKey()) {
                    try {
                        String key = headerIterator.nextKey();
                        String value = headerMap.getString(key);
                        headerBuilder.add(key, value);
                    } catch (NoSuchKeyException e) {
                        e.printStackTrace();
                    }
                }

                byte[] base64Array = Base64.decode(imageData, Base64.DEFAULT);
                InputStream stream = new ByteArrayInputStream(base64Array);
                final long totalSize = base64Array.length;


                Log.e("POST_MULTIPART","======= New file from image data =========");

                MultipartBuilder multipartBuilder = new MultipartBuilder()
                        .type(MultipartBuilder.FORM)
                        .addPart(
                                Headers.of("Content-Disposition",
                                        String.format("form-data; name=\"%s\"; filename=\"%s\"", imageKey, imageName)
                                ),
                                new CountingFileRequestBody(stream, totalSize, "image/*", new CountingFileRequestBody.ProgressListener() {
                                    @Override
                                    public void transferred(long num) {
                                        final WritableMap params = Arguments.createMap();
                                        params.putInt("totalBytesWritten", (int)num);
                                        params.putInt("totalBytesExpectedToWrite", (int)totalSize);

                                        Log.e(TAG, "Uploading: " + num + "/" + totalSize);

                                        reactContext
                                                .getJSModule(RCTNativeAppEventEmitter.class)
                                                .emit("WSUploadingProgress", params);
                                    }
                                })
                        );

                if (postData.hasKey("parameters")) {

                    Log.e("POST_MULTIPART","======= Has parameters =========");
                    ReadableMap parameterMap = postData.getMap("parameters");
                    ReadableMapKeySetIterator paramsIterator = parameterMap.keySetIterator();
                    while (paramsIterator.hasNextKey()) {
                        try {
                            String key = paramsIterator.nextKey();
                            ReadableType tyle = parameterMap.getType(key);
                            String value;

                            switch (tyle) {
                                case Boolean:
                                    value = String.valueOf(parameterMap.getBoolean(key));
                                    break;
                                case Number:
                                    value = String.valueOf(parameterMap.getDouble(key));
                                    break;
                                default:
                                    value = String.valueOf(parameterMap.getString(key));
                                    break;
                            }

                            multipartBuilder.addPart(
                                    Headers.of("Content-Disposition", "form-data; name=\"" + key + "\""),
                                    RequestBody.create(null, value));
                        } catch (NoSuchKeyException e) {
                            e.printStackTrace();
                        }
                    }
                }

                Request request = new Request.Builder()
                        .headers(headerBuilder.build())
                        .url(url)
                        .post(multipartBuilder.build())
                        .build();

                // new call
                currentCall = client.newCall(request);

                currentCall.enqueue(new com.squareup.okhttp.Callback() {

                    @Override
                    public void onFailure(final Request request, IOException e) {
                        Log.e(TAG, "Got error");

                        String errMessage = e == null ? null : e.getMessage();
                        errMessage = errMessage == null ? "Unknown error!" : errMessage;
                        Log.e(TAG, errMessage);

                        if (completeCallback != null) {
                            completeCallback.invoke(errMessage, null);
                            completeCallback = null;
                        }
                    }

                    @Override
                    public void onResponse(Response response) throws IOException {
                        Log.e(TAG, "Got response");
                        String responseStr = response.body().string();

                        if (completeCallback != null) {
                            completeCallback.invoke(null, responseStr);
                            completeCallback = null;
                        }
                    }
                });

                Log.e(TAG, "End post Multipart");
            } catch (Exception e) {
                String errMessage = e.getMessage();
                errMessage = errMessage == null || errMessage.isEmpty() ? "Unknown error!" : errMessage;
                Log.e(TAG, errMessage);

                e.printStackTrace();

                if (completeCallback != null) {
                    completeCallback.invoke(e.getMessage(), null);
                    completeCallback = null;
                }
            }
            return null;
        }
    }
}
