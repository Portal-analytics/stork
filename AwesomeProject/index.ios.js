/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  AlertIndicatorIOS,
  ActivityIndicatorIOS,
  AlertIOS,
  Image,
  TextInput,
  Switch,
  NavigatorIOS,
  ListView,
  TabBarIOS,
} from 'react-native';
import MapView from 'react-native-maps';

class AwesomeProject extends React.Component {

  constructor(){
    super();
    this.state = {
  
  }

  }

  render () {
    return (
      <View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A1CCDD',
    },
    welcome: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    submit: {
      textAlign: 'center',
      backgroundColor: '#ffffff',
      margin: 10,
    },
    submitView: {
      backgroundColor: '#ff8000',
      margin: 20,
    },
    placeARequestSwitch:
    {
      margin: 10,
    },
    altLocationTextInput: {
      height: 40,
      borderColor: 'gray',
      width: 280,
      flex: 1
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },

    });

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
