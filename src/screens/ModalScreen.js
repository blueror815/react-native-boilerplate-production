import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class ModalScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object
  }

  static navigatorButtons = {
    leftButtons: [{
      title: 'Close',
      id: 'close'
    }]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'close') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Modal Screen</Text>
      </View>
    );
  }
}
