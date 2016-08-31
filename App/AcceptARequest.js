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
  Navigator,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import SearchingForStork from './SearchingForStork';
import Tracker from './Tracker';
import HomePage from './HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';
import firebase from 'firebase';


class AcceptARequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchIsOn: true,
      altLocationIsVisible: false,
      venue: '',
      order: '',
      altLocation: '',
      tip: '',
      user: firebase.auth().currentUser,
    };

  }

  onCancel(){
    this.props.closeOrderModal();
  }

  onSubmit(){


   this.props.onOrderAccepted();
    let venue = this.state.venue;
    let order = this.state.order;

    var database = firebase.database();
    var requestsRef = database.ref('requests/')
//change to tracker
  }

  dismissOrderKeyboard() {

    dismissKeyboard();
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
                    { return (<View><Text style={styles.title}>Accept a Request</Text></View>);},
                }} />
          } />
    );
  }

  renderScene() {

    return (
      <View style={styles.container}>
        <View style={styles.submit}>
          <TextInput
          style={styles.venueInput}
          ref= 'venue'
          placeholder={this.state.venue}
          placeholderTextColor = '#000000'
          editable= {false}
          value={this.state.venue}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.welcome}> Deliver to this address: </Text>
        </View>
        <View>
          <TextInput
          style={styles.venueInput}
          ref = 'venue'
          placeholder= {this.state.deliveryAddress}
          placeholderTextColor = '#000000'
          editable={false}
          value={this.state.deliveryAddress}
          />
        </View>
        <View style={styles.submit}>
          <TextInput
          ref='order'
          onChangeText={(order) => this.setState({order})}
          value={this.state.order}
          style={ { height: 300, borderColor: 'gray', width: 280, flex: 1, borderRadius: 8, borderWidth: 1, backgroundColor: 'white', paddingLeft: 5, fontSize: 16} }
          multiline = {true}
          placeholder = {this.state.order}
          placeholderTextColor = '#000000'
          editable = {false}
          />
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>Tip:  $</Text>
            <TextInput
            style={styles.tipInput}
            ref = 'tip'
            placeholder= {this.state.tip}
            placeholderTextColor = '#000000'
            editable = {false}
            value={this.state.tip}
            />
          </View>
        </View>
        <View>
          <TouchableHighlight style={styles.button} onPress={this.onSubmit.bind(this)}>
            <Text style={styles.buttonText}> Accept Request! </Text>
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
    backgroundColor: '#00ff00',
    borderColor: '#00ff00',
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
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tipText:{
    marginTop: 10,
    fontSize: 24,
  },
  tipInput: {
    height: 30,
    borderColor: 'gray',
    width: 32,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 10
  }
});

module.exports = AcceptARequest;
