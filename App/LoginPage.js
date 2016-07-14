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
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import firebase from 'firebase';

var provider = new firebase.auth.FacebookAuthProvider(); //still need to integrate
var currentUser = false;

class LoginPage extends React.Component {



  constructor(props) {
  super(props);
  // FB.init({
  //   appId: '293538377660263',
  //   status: true,
  //   xfbml: true,
  //   version: 'v2.6'
  // });
  // FB.Event.subscribe('auth.authResponseChange', checkLoginState);
  this.state = {
    loaded: true,
    email: '',
    password: '',

  };
}

  checkLoginState(event){
    if(event.authResponse) {
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser){
        unsubscribe();
        if(!isUserEqual(event.authResponse, firebaseUser)) {
          var credential = firebase.auth.FacebookAuthProvider.credential(
            event.authResponse.accessToken);
            firebase.auth().signInWithCredential(credential).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage);
            });
        } else {

        }
      });
    } else {
      firebase.auth().signOut();
    }
  }

  writeUserData() {
  var provider = new firebase.auth.FacebookAuthProvider();

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
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      if(error){
        switch(error.code){
          case "auth/email-already-in-use":
          alert('Account cannot be created because email is already in use.')
          break;
          case "auth/invalid-email":
          alert('The email is not valid (make sure its a .edu address)');
          break;
          case "auth/weak-password":
          alert('Account cannot be created because password is too weak.')
          default:
          alert('Error creating user ' + error.code);
        }
      }
    });
  }



  _handleChangePage() {
  const {email, password} = this.state
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
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

LayoutAnimation.easeInEaseOut();
  this.props.navigator.push({
  component: HomePage,
  props: {
    email: this.state.email,
    password: this.state.password,
  }

});


  }


  render() {
    return (
      <YANavigator.Scene delegate={this} style={styles.container}>
        <Image source={require('../storklogo.jpg')} style={styles.logoImage}/>
        <Text style={styles.topInputText}> email </Text>
        <TextInput
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}

        ref='emailVal'
        style={styles.textEntry}
        placeholder = 'Email'
        autoCapitalize = "none"

        />
        <Text style={styles.topInputText}> Password </Text>
        <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        onSubmitEditing={this.writeUserData}
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

        </View>
        <View style={styles.facebookButton}>
          <LoginButton

            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {

                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      for(var key in data){
                        console.log(key);
                      }
                      firebase.auth().signInWithCredential(data.accessToken.toString());
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        </View>
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
  facebookButton: {
    alignSelf: 'center'
  },
});

module.exports = LoginPage;
