'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';
import Spinner from 'react-native-spinkit';
import HomePage from './HomePage';
import Logo from '../storklogo.jpg';


class ConfirmCheckIn extends React.Component {
  
  goToHomePage() {
    this.props.navigator.push({
      component: HomePage
    });
  }

  render() {
    return(
      <YANavigator.Scene
        delegate={this}
        style={styles.container}
        >
        <Image style={styles.picFormat} source={Logo} />
        <Text style={styles.text}> You are now a Stork! </Text>
        <Text style={styles.text}>You can now return to Home! </Text>
        <TouchableHighlight style={styles.button} onPress={this.goToHomePage.bind(this)}>
          <Text style={styles.buttonText}> Go Back To Home </Text>
        </TouchableHighlight>
      </YANavigator.Scene>
      );
  }

  static navigationDelegate = {
    id: 'ConfirmCheckIn',
    navBarBackgroundColor: 'white',
    renderTitle() {
      return (<View><Text style={styles.title}> You're a Stork! </Text></View>)
    },
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#A1CCDD',
    },
    text: {
      fontSize: 24,
      textAlign: 'center'
    },
    title: {
      fontSize: 20,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      color: 'black',
    },
    button: {
      height: 36,
      flexDirection: 'row',
      backgroundColor: '#ff8000',
      borderColor: '#ff8000',
      borderWidth: 1,
      borderRadius: 8,
      paddingRight: 10,
      paddingLeft: 10,
      marginTop: 25,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    picFormat: {
      height: 400,
      width: 400,
      resizeMode: 'contain',
    }
});

module.exports = ConfirmCheckIn;