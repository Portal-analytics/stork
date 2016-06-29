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
  NavigatorIOS,
  ListView,
  TabBarIOS,
} from 'react-native';

class TabBar extends React.Component {
  constructor() {
    super();
    this.state = {
    selectedTab : 'redTab',
    notifCount: 0,
    presses: 0,
    };
  }

    _renderContent (color: string, pageText: string) {
      return (
        <View style={styles.tabContent}>
        <Text style={styles.tabText}> {pageText} </Text>
        <Text style={styles.tabText}> re-renders of the {pageText}</Text>
        </View>
      )
    }

  render() {
  return(
    <TabBarIOS
    unselectedTintColor="yellow"
    tintColor="white"
    barTintColor="darkslateblue">
    <TabBarIOS.Item
    title="Blue Tab"
    selected={this.state.selectedTab === 'blueTab'}
    onPress={() => {
      this.setState({
        selectedTab: 'blueTab',
      });
    }}>
    {this._renderContent('#414A8C', 'Blue Tab')}
    </TabBarIOS.Item>
    <TabBarIOS.Item
    selected={this.state.selectedTab === 'redTab'}
    onPress={() => {
      this.setState({
        selectedTab: 'redTab',
      });
    }}>
    {this._renderContent('#783E33', 'Red Tab')}
    </TabBarIOS.Item>
    <TabBarIOS.Item
    title="More"
    selected={this.state.selectedTab === 'greenTab'}
    onPress={() => {
      this.setState({
        selectedTab: 'greenTab',
      });
    }}>
    {this._renderContent('#21551C', 'Green Tab')}
    </TabBarIOS.Item>
    </TabBarIOS>
  );
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
      backgroundColor: '#ffffff',
      margin: 10,
    },
    submitView: {
      backgroundColor: '#ff8000',
      margin: 20,
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
    }

  });
  module.exports = TabBar;
