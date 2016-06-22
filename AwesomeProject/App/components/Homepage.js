import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  NavigatorIOS,
} from 'react-native';

class Homepage extends React.Component {
  pressBeAStork() {
    console.log('fuk off');
  }
  pressRequest() {
    console.log('at your service');
  }

  render() {

    return (
      <View style={styles.container}>
      <TouchableHighlight onPress= {this.pressBeAStork}>
      <Text style={styles.h1}> Be a Stork? </Text>
      </TouchableHighlight>
      <Text> or </Text>
      <TouchableHighlight onPress={this.pressRequest}>
      <Text style={styles.h1}> Request one? </Text>
      </TouchableHighlight>
      </View>
    );
  }
}
