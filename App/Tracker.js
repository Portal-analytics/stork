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
  ListView,
  TabBarIOS,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

class Tracker extends React.Component {

  constructor(props){
    super(props);
    //props: request object
    this.state = {
      markers: [
        {
          title: 'Pickup Location',
          latlng: {
            latitude: '',//request.venue.coords.latitude
            longitude: ''//request.venue.coords.longitude
          },
          description: '', //request.venue
        },
        {
          title: 'Dropoff Location',
          latlng: {
            latitude: '', //request.altLocation.geocode.lat || request.user.currentLat
            longitude: '', //request.altLocation.geocode.long || request.user.currentLong
          },
          description: '', //? fuck we put here ? anything?
        }
      ],
    }
  }
  render () {
    return (
      <View
        style={styles.mapContainer}
        >
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.02937, //will not be neccesary (i think) outside of sim
          longitude: -78.47678,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true} //switch to true when not in simulator
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          />
        ))}
          </MapView>

      </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    mapContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    back: {
      position: 'absolute',
      top: 20,
      left: 12,
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: 12,
      borderRadius: 20,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      color: '#ff8000',
    },
});

module.exports = Tracker;
