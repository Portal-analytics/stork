'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-spinkit';
import HomePage from './HomePage';
import Checkmark from '../logos/checkmark.png';


class SearchingForStork extends React.Component {
  
  pushToHomePage() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View
        style={styles.container}
        >
        <Image style={styles.picFormat} source={Checkmark} />
        <Text style={styles.text}> Your request has been placed! </Text>
        <Text style={styles.text}>You can now return to Home while we find you a Stork! </Text>
        <TouchableHighlight style={styles.button} onPress={this.pushToHomePage.bind(this)}>
          <Text style={styles.buttonText}> Go Back To Home </Text>
        </TouchableHighlight>
      </View>
      );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A1CCDD',
    },
    text: {
      fontSize: 24,
      textAlign: 'center'
    },
    title: {
      fontSize: 24,
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
      height: 200,
      width: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    }
});

module.exports = SearchingForStork;