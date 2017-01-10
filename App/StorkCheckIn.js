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
  Navigator,
  Picker,
} from 'react-native';
import Icons from 'react-native-vector-icons';
import ConfirmCheckIn from './ConfirmCheckIn';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class StorkCheckIn extends React.Component {
  constructor() {
    super();


    this.state = {
      checkinsRef: firebase.database().ref('checkins/'),
      destination: '',
      isAtDestination: true,
      eta: '',
      user: firebase.auth().currentUser,
      submissionLoc: '',
      currentLat: 0,
      currentLong: 0,
    };
  }

  toggleCheckInSwitch () {
    this.setState({
      isAtDestination: !this.state.isAtDestination,
    });
  }

  submitCheckIn () {
    var tryLat = 0;
    var tryLong = 0;
    let destination = this.state.destination;
    navigator.geolocation.getCurrentPosition(
    (position) =>{

      var newCheckin = this.state.checkinsRef.push({
        destination: this.state.destination,
        uid: this.state.user.uid,
        eta: this.state.eta,
        active: true,
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude,

       });

    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

    // this.setState({
    //   currentLat: tryLat,
    //   currentLong: tryLong,
    // })
    // console.log('this.state.currentLong is ' + this.state.currentLong)
    //
    // var checkinKey = newCheckin.key;
    // pass the checkin Key to the method below v
    this.props.goToConfirmCheckIn();

  }

  addCheckinKey(checkinKey) {
    firebase.database().ref('checkins/' + checkinKey).set({
      checkinKey: checkinKey,
    });
  }

  renderTextInput() {
    return(
      <TextInput
      style={styles.inputText}
      ref = 'destination'
      placeholder= 'Bodos, CVS, Newcomb'
      color = '#000000'
      onChangeText={(destination) => this.setState({destination})}
      value={this.state.destination}
      />
    )
  }

  render() {
    var alt = (!this.state.isAtDestination)?
    (<TextInput style={styles.inputText} maxLength={2} keyboardType='numeric' placeholder='Estimated minutes until arrival' onChangeText={(eta) => this.setState({eta})}/>) : null;
    return (
      <View style={styles.container}>
      <Text style={styles.header}> Check-In </Text>
      <Text style={styles.checkInText}> Check-ins allow you to notify others where you will be so they can submit requests to you before you order</Text>
      <View style={styles.or}>
      <Text style ={styles.checkInText}> Destination </Text>
      <View>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data.terms[0].value);
        this.setState({
          destination: data.terms[0].value,
        })
          console.log('this is details');
          console.log(details);
          console.log('apparently working');
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyASAkQcB8bk-tXpWbVCP4JPpn4r30oAtb8',
          language: 'en', // language of the results
          types: 'establishment', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list

        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}
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
      <View>{alt}</View>
      <View style={styles.submitView}>
      <TouchableHighlight style={styles.button} onPress={this.submitCheckIn.bind(this)}>
      <Text style={styles.buttonText}> Check in! </Text>
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
  displayETA: {
    height: 40,
    borderColor: 'gray',
    width: 280,
    flex: 1,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
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

module.exports = StorkCheckIn;
