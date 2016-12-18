import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import { increment } from 'app/redux/reducers/counter';

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
    count: state.counter.count
  }),
  { increment }
)
export default class SecondScreen extends Component {
  static propTypes = {
    increment: PropTypes.func,
    count: PropTypes.number
  }

  onIncrease = () => {
    this.props.increment();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Count: {this.props.count}</Text>
        <TouchableOpacity onPress={this.onIncrease}>
          <Text style={styles.button}>Increase</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
