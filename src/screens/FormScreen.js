import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

// here we are: define your domain model
const Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

export default class FormScreen extends Component {

  onPress = () => {
    // call getValue() to get the values of the form
    const value = this._form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={(ref) => { this._form = ref; }}
          type={Person}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
