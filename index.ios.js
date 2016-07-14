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
  Navigator,
} from 'react-native';
import LoginPage from './App/LoginPage';
import HomePage from './App/HomePage';
import ConfirmCheckIn from './App/ConfirmCheckIn';
import ConfirmCheckOut from './App/ConfirmCheckOut';
import SearchingForStork from './App/SearchingForStork';
import SignUp from './App/SignUp';
import Settings from './App/Settings';
import FacebookLogin from './App/FacebookLogin';
import Icons from 'react-native-vector-icons';
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
noRoute(navigator) {
  return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
        </TouchableHighlight>
      </View>
    );
}

renderScene(route, nav) {
    var routeID = route.id;
    if(routeID === 'LoginPage') {
        return (
          <LoginPage 
            navigator={nav}/>
        );
    }
    if(routeID === 'HomePage') {
      return (
        <HomePage 
          navigator={nav} 
          title="Stork" />
      );
    }
    if(routeID === 'ConfirmCheckIn') {
      return (
        <ConfirmCheckIn 
          navigator={nav} 
          title="Stork" />
      );
    }
    if(routeID === 'ConfirmCheckOut') {
      return (
        <ConfirmCheckOut 
          navigator={nav} 
          title="Stork" />
      );
    }
    if(routeID === 'SearchingForStork') {
      return (
        <SearchingForStork 
          navigator={nav} 
          title="Stork" />
      );
    }
    if(routeID === 'SignUp') {
      return (
        <SignUp 
          navigator={nav} 
          title="Stork" />
      );
    }
    if(routeID === 'Settings') {
      return (
        <Settings
          navigator={nav} />
        );
    }
    if(routeID === 'FacebookLogin') {
      return (
        <FacebookLogin
          navigator={nav} />
        )
    }
    return this.noRoute(nav);
  }

  render() {
    return (
      <Navigator
        style={styles.nav}
        initialRoute={{id: 'LoginPage', index: 0}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}/>
                    
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
