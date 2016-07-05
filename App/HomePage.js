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
  LayoutAnimation,
  StatusBar,
  ListView,
  ScrollView,
} from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';
import StorkCheckIn from './StorkCheckIn';
import PlaceARequest from './PlaceARequest';
import MapView from './MapViewz';
import RequestTabBar from './RequestTabBar';
import Logo1 from '../logos/logo1.jpg';
import Logo2 from '../logos/logo2.png';
import Logo3 from '../logos/logo3.jpg';
import Logo4 from '../logos/logo4.jpg';
import Logo5 from '../logos/logo5.png';
import Logo6 from '../logos/logo6.png';
import Logo7 from '../logos/logo7.png';
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Homepage extends React.Component {
  
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
    userName: props.userName,
    password: props.password,
    drawerOpen: false,
    dataSource: ds.cloneWithRows(['Be a Stork', 'Request a Stork', 'About Us', 'Profile']),
    deals: ds.cloneWithRows(deals),

  };
}

  pressBeAStork() {
    this.props.navigator.push({
      component: StorkCheckIn,
    });
    this.toggleDrawer();
  }

  pressRequest() {
    this.props.navigator.push({
      component: PlaceARequest
    });
    this.toggleDrawer();
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  goToMap() {
    this.props.navigator.push({
      component: MapView
    });
    this.toggleDrawer();
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

  renderDrawerItems(item) {
    if (item === 'Be a Stork') {
    return (
      <TouchableHighlight onPress={this.pressBeAStork.bind(this)}><Text style={styles.menuItems}>{item}</Text></TouchableHighlight>
      )
  }
  if (item === 'Request a Stork') {
    return (
      <TouchableHighlight onPress={this.pressRequest.bind(this)}><Text style={styles.menuItems}>{item}</Text></TouchableHighlight>
      )
  }
  if (item === 'About Us') {
    return (
      <TouchableHighlight onPress={this.goToMap.bind(this)}><Text style={styles.menuItems}>{item}</Text></TouchableHighlight>
      )
  }
  if (item === 'Profile') {
    return (
      <TouchableHighlight onPress={this.toggleDrawer.bind(this)}><Text style={styles.menuItems}>{item}</Text></TouchableHighlight>
      )
  }

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
      <YANavigator.Scene
        delegate={this}
        style={styles.container}
        >
        <Drawer
          ref={(ref) => this._drawer = ref}
          open={this.state.drawerOpen}
          type="displace"
          styles={{main: {shadowColor: "black", shadowOpacity: 0.3, shadowRadius: 15}}}
          content={
            <View style={styles.drawer}>
            <ListView
              style={styles.drawer}
              dataSource={this.state.dataSource}
              renderSeparator={this._renderSeperator}
              renderRow={(rowData) => this.renderDrawerItems(rowData)}/>
            <Image style={styles.storkLetters} source={require('../storkletters.jpg')}/>
            </View>
            }
          acceptDoubleTap
          openDrawerOffset={.25}>

        <ScrollView style={styles.container}>
          <Text style={styles.h1}> {days[new Date().getDay()]} </Text>
          <ListView
            style={styles.picContainer}
            dataSource={this.state.deals}
            renderSeparator={this._renderSeperator}
            renderRow={(rowData) => this.renderDeals(rowData)}
            >
          </ListView>
        </ScrollView>
        </Drawer>
        
      </YANavigator.Scene>
    );
  }

  static navigationDelegate = {
    id: 'homePage',
    navBarBackgroundColor: '#A1CCDD',
    renderTitle() {
      return (<View><Text style={styles.title}> Stork </Text></View>)
    },
    renderNavBarLeftPart() {
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={() => 'toggleDrawer'}>
            <Icon  style={{fontSize: 24}} name="bars"/>
          </TouchableHighlight>
        </View>
        )
    },

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
  title: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: '#ff8000',
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
  backdropView: {
    height: 130,
    width: 374,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  spacer: {
    paddingTop: 5,
    paddingBottom: 5,
  }
});

module.exports = Homepage;