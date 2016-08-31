'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  TabBarIOS,
  TabBarItemIOS,
  LayoutAnimation,
  StatusBar,
  ListView,
  ScrollView,
  SegmentedControlIOS,
  Navigator,
  Modal
} from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import StorkCheckIn from './StorkCheckIn';
import SearchingForStork from './SearchingForStork';
import Deals from './Deals';
import Tracker from './Tracker';
import PlaceARequest from './PlaceARequest';
import MapViewz from './MapViewz';
import ConfirmCheckIn from './ConfirmCheckIn';
import ConfirmCheckOut from './ConfirmCheckOut';
import StorkCheckOut from './StorkCheckOut';
import Settings from './Settings';
import RequestList from './RequestList';
import VenueRequests from './VenueRequests';
import Browse from './Browse';
import Logo from '../storklogo.jpg';


class Homepage extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    password: props.password,
    selectedTab: 'Order',
    notifCount: 0,
    presses: 0,
    currentOrderComponent: 'Map',
    currentDeliverComponent: 'Check-In',
    orderIndex: 0,
    deliverIndex: 2,
    checkedInValue: 'Check-In',
    uid: '',
    email: '',
    orderModalVisible: false,
    settingsModalVisible: false,
  };
  this.goToConfirmCheckIn=this.goToConfirmCheckIn.bind(this);
  this.goToConfirmCheckOut=this.goToConfirmCheckOut.bind(this);
  this.goToVenueRequests=this.goToVenueRequests.bind(this);
  this.pushToSearchingForStork=this.pushToSearchingForStork.bind(this);
  this.closeOrderModal=this.closeOrderModal.bind(this);
  this.closeSettingsModal=this.closeSettingsModal.bind(this);
  this.goToVenueRequests=this.goToVenueRequests.bind(this);
  this.goToTracker=this.goToTracker.bind(this);
}

  //Changes the scene based on which tab is pressed in the segment control for the Order Tab
  renderOrderScrollScreen() {
    if (this.state.currentOrderComponent === 'Map') {
      return(
        <View style={styles.innerContainer}>
          <MapViewz/>
        </View>
        )
    } else if (this.state.currentOrderComponent === 'Browse') {
      return (
        <ScrollView style={styles.scrollContainer}>
          <Browse/>
        </ScrollView>
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
        <ScrollView style={styles.scrollContainer}>
          <RequestList goToVenueRequests={this.goToVenueRequests}/>
        </ScrollView>
        )
    } else if (this.state.currentDeliverComponent === '$$$') {
      return (
        <ScrollView style={styles.scrollContainer}>
          <RequestList goToVenueRequests={this.goToVenueRequests}/>
        </ScrollView>
        )
    } else if (this.state.currentDeliverComponent === 'Check-In') {
      return (
        <View style={styles.innerContainer}>
          <StorkCheckIn goToConfirmCheckIn={this.goToConfirmCheckIn}/>
        </View>
        )
    } else if (this.state.currentDeliverComponent === 'Check Out') {
      return (
        <View style={styles.container}>
          <StorkCheckOut checkinKey={this.state.checkinKey} goToConfirmCheckOut={this.goToConfirmCheckOut}/>
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
    //console.log('order');
    this.setState({
      selectedTab: 'Order',
      title: 'Stork',
    });
  }

  deliverTabUpdate() {

    this.setState({
      selectedTab: 'Deliver',
      title: 'Deliver'
    });

  }

  goToConfirmCheckIn(checkinKey) {
    this.props.navigator.push({
      id: 'ConfirmCheckIn',
    });
    this.setState({
      currentDeliverComponent: '$$$',
      deliverIndex: 1,
      checkedInValue: 'Check Out',
      checkinKey: checkinKey,
    });

  }

  goToConfirmCheckOut(checkinKey) {
    this.props.navigator.push({
      id: 'ConfirmCheckOut',
    });
    this.setState({
      currentDeliverComponent: 'Check-In',
      deliverIndex: 2,
      checkedInValue: 'Check-In',
      checkinKey: this.state.checkinKey,
    });
  }

  showPlaceARequestModal() {
    if(this.state.orderModalVisible === false) {
      this.setState({
        orderModalVisible: true,
      });
    }
  }

  goToVenueRequests() {
    console.log(this.props);
    console.log('props of homepage ' + this.props.placeSelected);
    this.props.navigator.push({
      id: 'VenueRequests',
      passProps:{
        placeSelected: this.props.placeSelected,
      }
    });

  }

  goToTracker() {
    this.props.navigator.push({
      id: 'Tracker',
    });
  }

  closeOrderModal() {
    this.setState({
      orderModalVisible: false,
    });
  }

  closeSettingsModal() {
    this.setState({
      settingsModalVisible: false,
    });
  }

  pushToSearchingForStork() {
    this.props.navigator.push({
      id: 'SearchingForStork',
    });
  }

  showSettingsModal() {
    if(this.state.settingsModalVisible === false) {
      this.setState({
        settingsModalVisible: true,
      });
    }
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          configureScene={(route, navigator) =>
            Navigator.SceneConfigs.FloatFromRight}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#A1CCDD'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    {return (<View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.showSettingsModal.bind(this)}>
                                  <Icon  style={{fontSize: 24, margin: 10}} name="cog" color={'gray'}/>
                                </TouchableOpacity>
                              </View>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.showPlaceARequestModal.bind(this)}>
                                  <Icon  style={{fontSize: 24, margin: 10}} name="shopping-cart" color={'gray'}/>
                                </TouchableOpacity>
                              </View>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}> {this.state.selectedTab} </Text></View>);},
                }} />
          } />
    );
  }

  renderScene(route, navigator) {
    var checkedInValue = this.state.checkedInValue;
    return (
      <View
        style={styles.container}
        >
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.orderModalVisible}
          >
          <PlaceARequest pushToSearchingForStork={this.pushToSearchingForStork} closeOrderModal={this.closeOrderModal}/>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.settingsModalVisible}
          >
          <Settings closeSettingsModal={this.closeSettingsModal}/>
        </Modal>

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
          <View style={styles.innerContainer}>
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
          <View style={styles.innerContainer}>
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
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
    marginTop: 64,
  },
  innerContainer: {
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
