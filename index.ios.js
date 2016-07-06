'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native';
import LoginPage from './App/LoginPage';
import HomePage from './App/HomePage';
import Icons from 'react-native-vector-icons';
import YANavigator from 'react-native-ya-navigator';
import firebase from 'firebase';

class Stork extends React.Component {

constructor(props) {
  super(props);
  firebase.initializeApp({
    apiKey: "AIzaSyASAkQcB8bk-tXpWbVCP4JPpn4r30oAtb8",
    authDomain: "stork-bb909.firebaseapp.com",
    databaseURL: "https://stork-bb909.firebaseio.com",
    storageBucket: "stork-bb909.appspot.com",
  });

}

  render() {
    return (
      <YANavigator
                    itemWrapperStyle={styles.navWrap}
                    style={styles.nav}
                    navBarStyle={{
                      backgroundColor: '#A1CCDD',
                    }}
                    initialRoute={{
                      component: LoginPage,
                    }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  submitView: {
    backgroundColor: '#ff8000',
    margin: 20,
  },
  logoContainer: {
    flex: 1,
  },
  logoImage: {
    height: 667,
    width: 375,
  },
  navWrap: {
    flex: 1,
    marginTop: 70
  },
  nav: {
    flex: 1,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => Stork);

module.exports = Stork;
