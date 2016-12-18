import {
  NativeModules,
  NativeAppEventEmitter,
  Platform
} from 'react-native';
var WS = NativeModules.WS;

export default class Rest {

  postMultiPartWithProgress(url, headers, postData, imageKey, imageName, imageData, progressCb, cb) {

      var obj = {
          url,
          imageKey,
          imageName,
          imageData,
          parameters: postData
      };

      if(headers)
        obj.headers = headers;

      var self = this;

      var subscription = null;

      subscription = NativeAppEventEmitter.addListener(
        'WSUploadingProgress',
        (progress) => progressCb(progress)
      );

      let callback = function (err, res) {
          let response = res;
          if (typeof response === 'string') {
              response = JSON.parse(res);
          }
          subscription.remove();
          return cb(response);
      };

      if (Platform.OS === 'ios') {
          WS.postMultipartWithProgress(obj, callback);
      } else if (Platform.OS === 'android') {
          // RNPostMultipart.postMultipartWithProgress(obj, callback);
      }

  }

  get(baseUrl, params) {
    const url = baseUrl + '?' + this.paramsToQuery(params);
    console.log('[GET] ', url);
    return new Promise((success, error) => {
      let errorData = null;
      fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        errorData = {
          status: response.status,
          message: 'HTTP status error',
          response
        };
        throw errorData;
      }).then((response) => {
        if (!response) {
          errorData = {
            status: response.status,
            message: 'Data is null',
            response: null
          };
          throw errorData;
        }
        return response.json();
      })
      .then((response) => {
        console.log('Response of ' + url, response);
        success(response);
      })
      .catch((e) => {
        return error(e);
      });
    });
  }

  post(url, objParameters) {
    return new Promise((success, error) => {
      const params = this.paramsToQuery(objParameters);
      let errorData = null;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        errorData = {
          status: response.status,
          message: 'HTTP status error',
          response
        };
        throw errorData;
      })
      .then((response) => {
        if (!response) {
          errorData = {
            status: response.status,
            message: 'Data is null',
            response: null
          };
          throw errorData;
        }
        return response.json();
      })
      .then((response) => {
        console.log('Response of ' + url, response);
        return success(response);
      })
      .catch((e) => {
        console.error(e);
        return error(e);
      });
    });
  }

  paramsToQuery(object) {
    if (!object) {
      return '';
    }
    // eslint-disable-next-line prefer-const
    let out = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in object) {
      if (object[key] !== null && object[key] !== undefined) {
        out.push(key + '=' + encodeURIComponent(object[key]));
      }
    }
    return out.join('&');
  }
}
