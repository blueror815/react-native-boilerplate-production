import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Screens } from './index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    marginBottom: 20
  },
  button: {
    marginBottom: 20
  }
});

export default class FirstScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object
  }

  onModalPress = () => {
    this.props.navigator.showModal({
      title: 'Modal',
      screen: Screens.ModalScreen
    });
  }

  onNotificationPress = () => {
    //  only support ios
    this.props.navigator.showInAppNotification({
      screen: Screens.NotificationScreen
    });
  }

  onLightBoxPress = () => {
    //  only support ios
    this.props.navigator.showLightBox({
      screen: Screens.LightBoxScreen,
      style: {
        backgroundBlur: 'dark'
      },
      passProps: {
        message: 'hey there'
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is the first screen</Text>
        <TouchableOpacity onPress={this.onModalPress}>
          <Text style={styles.button}>Show Modal Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onNotificationPress}>
          <Text style={styles.button}>Show Notification Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLightBoxPress}>
          <Text style={styles.button}>Show Light Box Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
