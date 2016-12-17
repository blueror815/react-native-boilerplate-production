import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class SecondScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Second screen</Text>
      </View>
    );
  }
}
