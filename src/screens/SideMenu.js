import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 300
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '500'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});

export default class SideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Side Menu</Text>

        <TouchableOpacity>
          <Text style={styles.button}>Menu 1</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.button}>Menu 2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
