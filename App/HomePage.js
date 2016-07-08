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
} from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';
import StorkCheckIn from './StorkCheckIn';
import SearchingForStork from './SearchingForStork';
import Deals from './Deals';
import PlaceARequest from './PlaceARequest';
import MapViewz from './MapViewz';
import ConfirmCheckIn from './ConfirmCheckIn';
import ConfirmCheckOut from './ConfirmCheckOut';
import StorkCheckOut from './StorkCheckOut';
import Browse from './Browse';
import NavBarTitle from './NavBarTitle';
import Logo from '../storklogo.jpg';

class Homepage extends React.Component {
  
  constructor(props) {
  super(props);
  this.state = {
    userName: props.userName,
    password: props.password,
    selectedTab: 'Order',
    notifCount: 0,
    presses: 0,
    currentOrderComponent: 'Map',
    currentDeliverComponent: 'Check-In',
    orderIndex: 0,
    deliverIndex: 2,
    checkedInValue: 'Check-In',
  };
  this.goToConfirmCheckIn=this.goToConfirmCheckIn.bind(this);
  this.goToConfirmCheckOut=this.goToConfirmCheckOut.bind(this);
}

  //Changes the scene based on which tab is pressed in the segment control for the Order Tab
  renderOrderScrollScreen() {
    if (this.state.currentOrderComponent === 'Map') {
      return(
        <View style={styles.container}>
          <MapViewz/>
        </View>
        )
    } else if (this.state.currentOrderComponent === 'Browse') {
      return (
        <View>
          <Browse/>
        </View>
        )
    } else if (this.state.currentOrderComponent === 'Deals') {
      return (
        <ScrollView style={styles.scrollContainer}>
          <Deals />
        </ScrollView>
        )
    }
  }

  //Changes the scene based on which tab is pressed in the segment control for the Deliver Tab
  renderDeliverView() {
    if (this.state.currentDeliverComponent === 'New') {
      return(
        <View style={styles.container}>

        </View>
        )
    } else if (this.state.currentDeliverComponent === '$$$') {
      return (
        <View style={styles.container}>
        </View>
        )
    } else if (this.state.currentDeliverComponent === 'Check-In') {
      return (
        <View style={styles.container}>
          <StorkCheckIn goToConfirmCheckIn={this.goToConfirmCheckIn}/>
        </View>
        )
    } else if (this.state.currentDeliverComponent === 'Check Out') {
      return (
        <View style={styles.container}>
          <StorkCheckOut goToConfirmCheckOut={this.goToConfirmCheckOut}/>
        </View>
        )
    }
  }

  //Next 2 Functions change the value of the segmented control
  onOrderValueChange(value) { 
      this.setState({
        currentOrderComponent: value,
      });
  }

  onDeliverValueChange(value) {
    this.setState({
      currentDeliverComponent: value,
    });
  }

  orderTabUpdate() {
    this.setState({
      selectedTab: 'Order',
    });
  }

  deliverTabUpdate() {
    this.setState({
      selectedTab: 'Deliver',
    });
  }

  goToConfirmCheckIn() {
    this.props.navigator.push({
      component: ConfirmCheckIn,
    });
    this.setState({
      currentDeliverComponent: '$$$',
      deliverIndex: 1,
      checkedInValue: 'Check Out',
    });
  }

  goToConfirmCheckOut() {
    this.props.navigator.push({
      component: ConfirmCheckOut,
    });
    this.setState({
      currentDeliverComponent: 'Check-In',
      deliverIndex: 2,
      checkedInValue: 'Check-In',
    });
  }

  render() {
    var checkedInValue = this.state.checkedInValue;
    return (
      <YANavigator.Scene
        delegate={this}
        style={styles.container}
        >
        <TabBarIOS
        
        unselectedTintColor={"#ff8000"}
        tintColor={"#ff8000"}
        barTintColor={"white"}>
        <Icon.TabBarItemIOS
          title="Order"
          iconName="cutlery"
          selectedIconName="cutlery"
          selected={this.state.selectedTab === 'Order'}
          onPress={this.orderTabUpdate.bind(this)}>
          <View style={styles.container}>
          <SegmentedControlIOS
            values={['Map', 'Browse', 'Deals']}
            selectedIndex={this.state.orderIndex}
            tintColor={'#ff8000'}
            onValueChange={this.onOrderValueChange.bind(this)}
            style={styles.segmentedControl}>
          </SegmentedControlIOS>
            {this.renderOrderScrollScreen()}
          </View>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Deliver"
          iconName="truck"
          selectedIconName="truck"
          selected={this.state.selectedTab === 'Deliver'}
          onPress={this.deliverTabUpdate.bind(this)}>
          <View style={styles.container}>
            <SegmentedControlIOS
              values={['New', '$$$', checkedInValue]}
              selectedIndex={this.state.deliverIndex}
              tintColor={'#ff8000'}
              onValueChange={this.onDeliverValueChange.bind(this)}
              style={styles.segmentedControl}>
            </SegmentedControlIOS>
              {this.renderDeliverView()}
          </View>
        </Icon.TabBarItemIOS>
        </TabBarIOS>
        
      </YANavigator.Scene>
    );
  }

  static navigationDelegate = {
    id: 'HomePage',
    navBarBackgroundColor: '#A1CCDD',
    renderTitle() {
        
        return (<View><Text style={styles.title}> Stork </Text></View>)
    },
    renderNavBarLeftPart() {
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={() => 'goToPlaceARequest'}>
            <Icon  style={{fontSize: 24}} name="cog" color={'gray'}/>
          </TouchableHighlight>
        </View>
        )
    },
    renderNavBarRightPart() {
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={() => 'goToPlaceARequest'}>
            <Icon  style={{fontSize: 24}} name="shopping-cart" color={'gray'}/>
          </TouchableHighlight>
        </View>
        )
    },

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
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
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  topTabBar: {
    position: 'absolute',
    top: 70,
    left: 180,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  scrollView: {
    width: 374,
    flexDirection: 'row',
  },
  titleLogo: {
    width:40,
    height: 40,
  },
  scrollContainer: {
    backgroundColor: '#A1CCDD',
    marginBottom: 51,
  },
  segmentedControl: {
    backgroundColor: 'white',
  },
  button: {
    height: 36,
    width: 100,
    backgroundColor: '#ff8000',
    borderColor: '#ff8000',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
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

module.exports = Homepage;