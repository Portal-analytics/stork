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

class Browse extends React.Component {

  getAvailableStorks() {
    //pulls available stork info from firebase and returns a list view
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> Browse </Text>
        {this.getAvailableStorks()}
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
});

module.exports = Browse;