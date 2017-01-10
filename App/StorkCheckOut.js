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
  Switch,
  Navigator
} from 'react-native';
import Icons from 'react-native-vector-icons';
import ConfirmCheckOut from './ConfirmCheckOut';

class StorkCheckOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      isAtDestination: true,
    };
  }

  submitCheckOut () {
    //Have to do logic to check out user and take it off the map
    var checkOutRef = firebase.database().ref('checkins/');
    var check = this.props.checkinKey
    console.log(this.props.checkinKey);
    firebase.database().ref('checkins/' + check).update({
        active: false,
      });

    this.props.goToConfirmCheckOut();

  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.header}> Check Out </Text>
        <Text style={styles.checkInText}> This allows you to stop being a Stork! </Text>
        <View style={styles.submitView}>
          <TouchableHighlight style={styles.button} onPress={this.submitCheckOut.bind(this)}>
            <Text style={styles.buttonText}> Check Out </Text>
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
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  checkInText: {
    color: '#ffffff',
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
  },
  destinationSwitch:
  {
    margin: 10,
  },
  submitView: {
    margin: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: 'black',
  },
  buttonText: {
    color: "#fff"
  },
  button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: 'red',
  borderColor: 'red',
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
  statusSwitch: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    flex: 1,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 24,
    fontFamily: 'Helvetica',
    alignSelf: 'center',
    marginTop: 5,
  }
});

module.exports = StorkCheckOut;
