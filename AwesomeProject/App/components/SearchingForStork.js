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
import TabBar from './App/components/TabBar';

class SearchingForStork extends React.Component {
  render() {
  return(

<View style={styles.container}>
<Text> Searching for Stork... </Text>
</View>

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
    });
