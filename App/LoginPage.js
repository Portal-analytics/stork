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
  Navigator
} from 'react-native';
import HomePage from './HomePage';
import Icons from 'react-native-vector-icons';
import StorkCheckIn from './StorkCheckIn';
import FBSDK, {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import firebase from 'firebase';

var provider = new firebase.auth.FacebookAuthProvider(); //still need to integrate
var currentUser = false;

class LoginPage extends React.Component {



  constructor(props) {
  super(props);
  this.state = {
    loaded: true,
    email: '',
    password: '',
    profilePic: null,
  };
}

  pushToSignUp() {
    this.props.navigator.push({
      id: 'SignUp'
    });

  }

   pushToHomePage(uid) {
    LayoutAnimation.easeInEaseOut();
    this.props.navigator.push({
      id: 'HomePage',
    });
  }

  _handleChangePage() {
    const {email, password} = this.state
    this.setState({
      loaded: false,
      email: this.state.email,
      password: this.state.password,
    });
    //firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult().then(function(result){
    //   if(result.credential){
    //     var token = result.credential.accessToken;
    //   }
    //   var user = result.user;
    // }).catch(function(error){
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   alert(errorMessage);
    // });
    var _this = this;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user){
          console.log(user);
          _this.pushToHomePage(user.uid);
        })
    .catch(function(error){
      if(error){
        switch(error.code){
          case "auth/wrong-password":
          alert('Incorrect password, try again.')
          break;
          case "auth/invalid-email":
          alert('The email is not valid (make sure its a .edu address)');
          break;
          case "auth/weak-password":
          alert('Account cannot be created because password is too weak.')
          default:
          alert('Error signing in ' + error.code);
        }
      }

    });
    
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../storklogo.jpg')} style={styles.logoImage}/>
        <Text style={styles.topInputText}> E-mail </Text>
        <TextInput
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}
        ref='emailVal'
        style={styles.textEntry}
        placeholder = 'E-mail'
        autoCapitalize = "none"

        />
        <Text style={styles.topInputText}> Password </Text>
        <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        style={styles.textEntry}
        placeholder = "Password"
        ref='passVal'
        secureTextEntry ={true}
        />

        <View style={styles.submitView}>
        <TouchableHighlight style={styles.button} onPress={this._handleChangePage.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        </View>
        <View>
        <TouchableHighlight onPress={this.pushToSignUp.bind(this)}>
        <Text style={styles.signupText}>Forgot your password?</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.pushToSignUp.bind(this)}>
        <Text style={styles.signupText}> Dont have an account? Sign Up! </Text>
        </TouchableHighlight>
        </View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
    justifyContent: 'center'
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
    height: 300,
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
  signupText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  }
});

module.exports = LoginPage;
