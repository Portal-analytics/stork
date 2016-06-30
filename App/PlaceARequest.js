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

class PlaceARequest extends React.Component {
  constructor() {
    super();
    this.state = {
      switchIsOn: true,
      altLocationIsVisible: false,
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
      altLocationIsVisible: !this.state.altLocationIsVisible,
    });
  }

  render() {
    var alt =  (this.state.altLocationIsVisible)?
    (<TextInput style={styles.displayAltLocation} placeholder='Alternative Location: eg. Rice 120'/>) : null;

    return (
      <View style={styles.container}>
      <View style ={styles.submit}>
      <TextInput
      style={styles.displayAltLocation}
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
      <View style={styles.submit}>
      {alt}
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
      style={ { height: 300, borderColor: 'gray', width: 280, flex: 1, borderRadius: 8, borderWidth: 1, backgroundColor: 'white', paddingLeft: 5, fontSize: 16} }
      multiline = 'true'
      placeholder = 'Order'
      />
      </View>
      <View>
      <TouchableHighlight style={styles.button} onPress={this.onSubmit.bind(this)}>
      <Text style={styles.buttonText}> Stork it! </Text>
      </TouchableHighlight>
      </View>
       </View>
    );
    }

    static navigationDelegate = {
    id: 'PlaceARequest',
    navBarBackgroundColor: 'white',
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
      margin: 10,
    },
    placeARequestSwitch:
    {
      margin: 10,
    },
    altLocationTextInput: {
      height: 40,
      borderColor: 'gray',
      width: 280,
      flex: 1
    },
    displayAltLocation: {
      height: 40, 
      borderColor: 'gray', 
      width: 280, 
      flex: 1,
      paddingLeft: 5,
      borderRadius: 8, 
      borderWidth: 1, 
      backgroundColor: 'white',
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
  });

module.exports = PlaceARequest;
