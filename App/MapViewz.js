'use strict'
import React, { Component, PropTypes } from 'react';
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
  TabBarIOS,
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';

class MapViewz extends React.Component {

  constructor(){
    super();
    this.state = {
    markers: [  //wil
      {
        title: 'Chipotle Request',
        latlng: {
        latitude:  38.049162,
        longitude: -78.503683,
      },
        description: 'Tip: $5',
      },
      {
        title: 'Christians Request',
        latlng:{
        latitude: 38.030802,
        longitude: -78.482196,
      },
        description: 'Tip $7',
      },
      {
        title: 'You, bitch',
        latlng: {
        latitude: 38.035974,
        longitude: -78.500286,
      },
        description: 'Duh',
      },
    ]
  }

  }

  render () {
    return (
      <YANavigator.Scene
        delegate={this}
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
        followsUserLocation={false} //switch to true when not in simulator
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          />
        ))}
          </MapView>
        <View>
        <TouchableOpacity
        style={styles.back}
        onPress= {console.log('link back to listview')}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 30}}>&larr;</Text>
        </TouchableOpacity>
        </View>
      </YANavigator.Scene>
  );
  }

  static navigationDelegate = {
    id: 'MapViewz',
    navBarBackgroundColor: '#A1CCDD',
    renderTitle() {
      return (<View><Text style={styles.title}>Stork</Text></View>)
    },
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A1CCDD',
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

module.exports = MapViewz;