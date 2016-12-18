import React, {Component, PropTypes} from 'react';
import ImagePicker from 'react-native-image-picker';
import ApiClient from 'app/utils/ApiClient';
import {connect} from 'react-redux';
import { setProgress } from 'app/redux/reducers/upload';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '500',
    marginBottom: 20
  },
  button: {
    color: 'green'
  }
});

@connect(
  state => ({
    progress: state.upload.progress
  }),
  { setProgress }
)

export default class SecondScreen extends Component {
  static propTypes = {
    setProgress: PropTypes.func,
    progress: PropTypes.number
  }

  onPickPhoto = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      noData: false
    };
    var self = this;
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const client = new ApiClient();
        client.postMultiPartWithProgress(
          'http://posttestserver.com/post.php',
          false,
          [],
          'image',
          'image.jpg',
          response.data,
          (progress) => {
            console.log('Upload progress: ', progress.totalBytesWritten, progress.totalBytesExpectedToWrite);
            self.props.setProgress(Math.ceil(progress.totalBytesWritten / progress.totalBytesExpectedToWrite * 100));
          },
          (response) => {
            console.log('Post result', response);
          }
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Current progress: {this.props.progress}%</Text>
        <TouchableOpacity onPress={this.onPickPhoto}>
          <Text style={styles.button}>Pick Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
