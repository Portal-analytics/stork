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
var Login = require('./App/components/Login.js');

class PlaceARequest extends React.Component {
  constructor() {
    super();
    this.state = {
      switchIsOn: true,
      venue: '',
      order: '',
      altLocation: '',
    };
  }

  onSubmit() {
    let venue = this.state.venue;
    let order = this.state.order;
  }
  switchTheWitch () {

    this.setState({
      switchIsOn: !this.state.switchIsOn,
    });
  }

  isEditable () {
    if(this.state.switchIsOn){
      return false;
    } else {
      return true;
    }
  }

  displayAltLocation () {
  if(this.state.switchIsOn){
    return styles.hideAltLocation;
  } else {
    return styles.showAltLocation;
  }
  }

  render() {

  return (
    <View style={styles.container}>
    <View style ={styles.submit}>
    <TextInput
    style={ { height: 40, borderColor: 'gray', width: 280, flex: 1 } }
    ref = 'venue'
    placeholder= 'Venue e.g. Chipotle, CVS, Clark Hall'
    color = '#000000'
    onChangeText={(venue) => this.setState({venue})}
    value={this.state.venue}
    />
    </View>
    <View style={{flexDirection: 'row'}}>
    <Text style={styles.welcome}> Deliver to current address: </Text>
    <Switch
    style = {styles.placeARequestSwitch}
    onValueChange={this.switchTheWitch.bind(this)}
    value={this.state.switchIsOn}
    />
    </View>
    <TextInput
    ref='alt location'
    onChangeText={(altLocation) => this.setState({order})}
    value={this.state.altLocation}
    style={this.displayAltLocation}
    editable = {this.isEditable}
    />
    <View style={styles.submit}>
    <TextInput
    ref='order'
    onChangeText={(order) => this.setState({order})}
    value={this.state.order}
    style={ { height: 300, borderColor: 'gray', width: 280, flex: 1} }
    multiline = 'true'
    placeholder = 'Order'
    />
    </View>
    <View style={styles.submitView}>
    <TouchableHighlight onPress={this.onSubmit.bind(this)}>
    <Text> Stork it! </Text>
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
  welcome: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submit: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  submitView: {
    backgroundColor: '#ff8000',
    margin: 20,
  },
  placeARequestSwitch:
  {
    margin: 10,
  },

});
