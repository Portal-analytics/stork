'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import HomePage from './HomePage';
import Icons from 'react-native-vector-icons';
import YANavigator from 'react-native-ya-navigator';
import StorkCheckIn from './StorkCheckIn';


class LoginPage extends React.Component {

  constructor() {
  super();
  this.state = {
    userName: '',
    password: '',

  };
}

_handleChangePage() {
  LayoutAnimation.easeInEaseOut();
    this.props.navigator.push({
      component: HomePage,
      props: {
        userName: this.state.userName,
        password: this.state.password,
      }

    });

  }

  render() {
    return (
      <YANavigator.Scene delegate={this} style={styles.container}>
        <Image source={require('../storklogo.jpg')} style={styles.logoImage}/>
        <Text style={styles.topInputText}> Username </Text>
        <TextInput
        onChangeText={(userName) => this.setState({ userName })}
        style={styles.textEntry}
        placeholder = 'Username'
        autoCapitalize = "none"

        />
        <Text style={styles.topInputText}> Password </Text>
        <TextInput
        onChangeText={(password) => this.setState({ password })}
        style={styles.textEntry}
        placeholder = "Password"
        secureTextEntry = 'true'
        />

        <View style={styles.submitView}>
        <TouchableHighlight style={styles.button} onPress={this._handleChangePage.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.welcome}> Don't have an account? Sign up!</Text>

      </YANavigator.Scene>
    );
  }

  static navigationDelegate = {
    id: 'LoginPage',
    navBarisHidden: true,

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  topInputText: {
    fontSize: 20,
    left: 0,
    marginLeft: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textEntry: { 
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 5,
    alignSelf: 'stretch',
  },
  submitView: {
    margin: 20,
  },
  logoImage: {
    height: 325,
    width: 375,
  },
  buttonText: {
    color: "#fff"
  },
  button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#ff8000',
  borderColor: '#ff8000',
  borderWidth: 1,
  borderRadius: 8,
  alignSelf: 'stretch',
  justifyContent: 'center',
  paddingRight: 10,
  paddingLeft: 10,
  },
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
});

module.exports = LoginPage;
