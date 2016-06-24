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
  NavigatorIOS,
} from 'react-native';

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
    let destination = this.state.destination;
    console.log('checked in');
  }

  render() {

    return (
      <View style={styles.container}>
      <Text style={styles.checkInText}> Check-ins allow you to notify others where you will be so they can submit requests to you before you order</Text>
      <View style={styles.or}>
      <Text style ={styles.checkInText}> Destination </Text>
      <View style={styles.whiteView}>
      <TextInput
      style={ { height: 40, borderColor: 'gray', width: 250, flex: 1, textAlign: 'center' } }
      ref = 'destination'
      placeholder= 'Bodos, CVS, Newcomb'
      color = '#000000'
      onChangeText={(destination) => this.setState({destination})}
      value={this.state.destination}
      />
      </View>
      </View>
      <View style={{flexDirection: 'row'}}>
      <Text style={styles.checkInText}> On the way </Text>
      <Switch
      style= {styles.destinationSwitch}
      onValueChange={this.toggleCheckInSwitch.bind(this)}
      value = {this.state.isAtDestination}
      />
      <Text style={styles.checkInText}> Currently here </Text>
      </View>
      <View style={styles.submitView}>
      <TouchableHighlight onPress={this.submitCheckIn.bind(this)}>
      <Text style={styles.checkInText}> Check in! </Text>
      </TouchableHighlight>
      </View>
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
  checkInText: {
    color: '#ffffff',
    textAlign: 'center',
    margin: 15,
  },
  destinationSwitch:
  {
    margin: 10,
  },
  submitView: {
    backgroundColor: '#ff8000',
    margin: 20,
  },
  whiteView: {
    backgroundColor: '#ffffff',
  },
  or: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
    },

});
