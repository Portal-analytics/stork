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

class NavBarTitle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Stork'
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.h1}>{this.state.title}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: '#ff8000',
  },
});

module.exports = NavBarTitle;