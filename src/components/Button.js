import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'blue',
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    backgroundColor: 'transparent'
  },
});

export default class Button extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    disabledStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    disabled: PropTypes.bool,
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    text: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    text: 'Button',
    disabledStyle: null,
    disabled: null,
    textStyle: null,
    style: null,
    onPress: null
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7}
        onPress={this.props.onPress}
        style={[
          styles.btn,
          this.props.style,
          this.props.disabled ? this.props.disabledStyle : null,
        ]}>
        <Text style={[styles.btnText, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
