'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  TabBarIOS,
  TabBarItemIOS,
  LayoutAnimation,
  StatusBar,
  ListView,
  ScrollView,
  SegmentedControlIOS,
  Navigator
} from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import StorkCheckIn from './StorkCheckIn';
import PlaceARequest from './PlaceARequest';
import MapViewz from './MapViewz';
import Logo from '../storklogo.jpg';
import Logo1 from '../logos/logo1.jpg';
import Logo2 from '../logos/logo2.png';
import Logo3 from '../logos/logo3.jpg';
import Logo4 from '../logos/logo4.jpg';
import Logo5 from '../logos/logo5.png';
import Logo6 from '../logos/logo6.png';
import Logo7 from '../logos/logo7.png';
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Deals extends React.Component {

  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  var vendorsRef = firebase.database().ref('vendors/');
  var newVendor = vendorsRef.push({
    location: '1505 University Ave',
    venue: 'trinity',
    deals: '$3 burgers',
  });
  var deals = [
      {
        store: 'Roots',
        deal: '10% off your Roots Bowl!',
        pic: Logo1,
      },
      {
        store: 'Chipotle',
        deal: 'Free Guac!',
        pic: Logo2,
      },
      {
        store: 'Five Guys',
        deal: 'Free Small Fry with any order!',
        pic: Logo3,
      },
      {
        store: "Q'Doba",
        deal: 'Half priced chips and guac!',
        pic: Logo4,
      },
      {
        store: 'Boylan Heights',
        deal: '15% off with student ID!',
        pic: Logo5,
      },
      {
        store: 'Harris Teeter',
        deal: '5% off all groceries',
        pic: Logo6,
      },
      {
        store: 'Kroger',
        deal: 'Coupons Galore',
        pic: Logo7,
      }
    ];
    this.state = {
    deals: ds.cloneWithRows(deals),
  };
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  renderDeals(index) {
      return(
        <View style={styles.spacer}>
        <Image style={styles.picFormat} source={index.pic}/>
        <Text style={styles.picText}> {index.deal} </Text>
        </View>
        )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          >
          <Text style={styles.h1}> {days[new Date().getDay()]} </Text>
          <ListView
            style={styles.picContainer}
            dataSource={this.state.deals}
            renderSeparator={this._renderSeperator}
            renderRow={(rowData) => this.renderDeals(rowData)}
            >
          </ListView>
        </ScrollView>
      </View>
      )

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navBar: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
  storeText: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    marginLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    color: 'white',
  },
  dealText: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  welcomeHomePage: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
  },
  h1: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
  },
  menuItems: {
    fontSize: 25,
    fontFamily: 'Helvetica',
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 5,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  storkLetters: {
    marginBottom: 45,
    marginLeft: 15,
  },
  picFormat: {
    alignSelf: 'center',
    width: 374,
    height: 130,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  picText: {
    textAlign: 'center',
    justifyContent: 'flex-end',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  });

module.exports = Deals;
