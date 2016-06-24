'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  AlertIndicatorIOS,
  ActivityIndicatorIOS,
  AlertIOS,
  Image,
  TextInput,
  Switch,
  NavigatorIOS,
  ListView,
} from 'react-native';
var PlaceARequest = require('./App/components/PlaceARequest.js');

class DirectStorkRequest extends React.Component {

  render() {
    var alt =  (this.state.altLocationIsVisible)?
    (<TextInput style={styles.altLocationTextInput} placeholder='Alternative Location: eg. Rice 120'/>) : null;

    return (
      <View style={styles.container}>
      <Text> Tell (this.stork) what you would like from (this.venue) </Text>
      <PlaceARequest />
       </View>
    );
    }
    }
