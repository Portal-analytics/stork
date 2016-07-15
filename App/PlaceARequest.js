'use strict'
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
  Switch,
  Navigator
} from 'react-native';
import SearchingForStork from './SearchingForStork';
import HomePage from './HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';
import firebase from 'firebase';


class PlaceARequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchIsOn: true,
      altLocationIsVisible: false,
      venue: '',
      order: '',
      altLocation: '',
      user: firebase.auth().currentUser,
    };

  }

  onCancel(){
    this.props.closeOrderModal();
  }

  onSubmit(){
   this.props.pushToSearchingForStork();
   this.props.closeOrderModal();
    let venue = this.state.venue;
    let order = this.state.order;

    var database = firebase.database();
    var requestsRef = database.ref('requests/')
    requestsRef.push({
      venue: this.state.venue,
      order: this.state.order,
      uid: this.state.user.uid,
      altLocation: this.state.altLocation,
      status: 'waiting',
      complete: false,
    });

    
    
  }
  switchTheWitch () {
    this.setState({
      switchIsOn: !this.state.switchIsOn,
      altLocationIsVisible: !this.state.altLocationIsVisible,
    });
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar 
              style={{backgroundColor: 'white'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    {return (<View/>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.onCancel.bind(this)}>
                                  <Icon  style={{fontSize: 36, marginRight: 10, marginTop: 2,}} name="close" color={'red'}/>
                                </TouchableOpacity>
                              </View>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}>Place a Request</Text></View>);},
                }} />
          } />
    );
  }

  renderScene() {
    var alt =  (this.state.altLocationIsVisible)?
    (<TextInput style={styles.displayAltLocation} placeholder='Alternative Location: eg. Rice 120'/>) : null;

    return (
      <View
        style={styles.container}
        >
      <View style={styles.submit}>
      <TextInput
      style={styles.venueInput}
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
      onChangeText={(altLocation) => this.setState({altLocation})}
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
      multiline = {true}
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    backgroundColor: '#A1CCDD',
  },
  welcome: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: 'black',
    marginBottom: 30
  },
  submit: {
    alignSelf: 'center',
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
  venueInput: {
    height: 40,
    borderColor: 'gray',
    width: 280,
    flex: 1,
    paddingLeft: 5,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
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
  cancelText: {
    color: 'red',
    fontSize: 18,
  },
  cancelButton: {
    position: 'relative',
    left: 250,
    bottom: 13,
    padding: 10,
  },
});

module.exports = PlaceARequest;
