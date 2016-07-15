'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Navigator
} from 'react-native';
import HomePage from './HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';



class FacebookLogin extends React.Component {

  constructor(props) {
  super(props);

  this.state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
}
_responseInfoCallback(error, result){
  if(error){
    alert('error ' + error.toString());
  } else {
    alert('Success ' + result.toString());
    console.log(result);
  }
}

  render() {
    return(
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#A1CCDD'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    { return (<View/>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View/>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}>Stork</Text></View>);},
                }} />
          } />
      );
  }

  renderScene() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Youre Almost Done!</Text>

        <Text style={styles.facebookText}>Stork takes security very seriously. For the safety of our users, we require users to link their Facebooks to their Stork accounts.</Text>

        <View style={styles.facebookButton}>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onPress={() => {console.log("login hi.");}}
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
                      console.log(data);
                      console.log(data.accessToken.toString());

                        const infoRequest = new GraphRequest(
                          '/me',
                          {
                            parameters: {
                              fields: {
                                string: 'name,picture'
                              },
                              accessToken: {
                                string: data.accessToken.toString()
                              }
                            }
                          },
                          this._responseInfoCallback
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();


                      firebase.auth().signInWithCredential(data.accessToken.toString());
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        </View>
      </View>
      );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 64,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: '#ff8000',
  },
  facebookButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  textEntry: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 5,
    alignSelf: 'stretch',
  },
  topInputText: {
    fontSize: 20,
    left: 0,
    marginLeft: 15,
  },
  facebookText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
    marginRight: 25,
    marginLeft: 25,
    justifyContent: 'center',
    textAlign: 'center'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center'
  },

});

module.exports = FacebookLogin;
