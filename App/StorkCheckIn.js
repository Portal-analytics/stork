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
} from 'react-native';
import Icons from 'react-native-vector-icons';
import YANavigator from 'react-native-ya-navigator';
import ConfirmCheckIn from './ConfirmCheckIn';

class StorkCheckIn extends React.Component {
  constructor() {
    super();
    this.state = {
      destination: '',
      isAtDestination: true,
    };
  }

  toggleCheckInSwitch () {
    this.setState({
      isAtDestination: !this.state.isAtDestination,
    });
  }

  submitCheckIn () {
    //Have to do logic to check in user and display it on the map
    let destination = this.state.destination;
    this.props.navigator.push({
      component: ConfirmCheckIn
    });
  }

  render() {

    return (
      <YANavigator.Scene delegate={this} style={styles.container}>
      <Text style={styles.checkInText}> Check-ins allow you to notify others where you will be so they can submit requests to you before you order</Text>
      <View style={styles.or}>
      <Text style ={styles.checkInText}> Destination </Text>
      <View >
      <TextInput
      style={styles.inputText}
      ref = 'destination'
      placeholder= 'Bodos, CVS, Newcomb'
      color = '#000000'
      onChangeText={(destination) => this.setState({destination})}
      value={this.state.destination}
      />
      </View>
      </View>
      <View style={styles.statusSwitch}>
      <Text style={styles.checkInText}> On the way </Text>
      <Switch
      tintColor={'#ff8000'}
      style= {styles.destinationSwitch}
      onValueChange={this.toggleCheckInSwitch.bind(this)}
      value = {this.state.isAtDestination}
      />
      <Text style={styles.checkInText}> Currently here </Text>
      </View>
      <View style={styles.submitView}>
      <TouchableHighlight style={styles.button} onPress={this.submitCheckIn.bind(this)}>
      <Text style={styles.buttonText}> Check in! </Text>
      </TouchableHighlight>
      </View>
    </YANavigator.Scene>
    );
  }

  static navigationDelegate = {
    id: 'Checkin',
    navBarBackgroundColor: 'white',
    renderTitle() {
      return (<View><Text style={styles.title}> Check-In </Text></View>)
    },
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
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
  }
});

module.exports = StorkCheckIn;