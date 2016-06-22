
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
switchTheWitch() {
  if(this.state.switchIsOn){
    this.setState({
      switchIsOn: false,
    });
  } else {
    this.setState({
      switchIsOn: true,
    })
  }
  }

render() {

  return (
    <View style={styles.container}>
    <View style ={styles.submit}>
    <TextInput
    style={ { height: 40, borderColor: 'gray', width: 280 } }
    placeholder= 'Venue e.g. Chipotle, CVS, Clark Hall'
    color = '#ffffff'
    />
    </View>
    <View>
    <Text> Deliver to current address: </Text>
    <Switch
    onValueChange={this.switchTheWitch.bind(this)}
    value={this.state.switchIsOn}
    />
    </View>
    <View style={styles.submit}>
    <TextInput
    style={ { height: 400, borderColor: 'gray', width: 280} }
    multiline = 'true'
    placeholder = 'Order'
    />
    </View>
     </View>
  );
}
}
