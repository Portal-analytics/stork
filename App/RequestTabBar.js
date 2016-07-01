'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Switch,
  NavigatorIOS,
} from 'react-native';
import SearchingForStork from './SearchingForStork';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';

class RequestTabBar extends React.Component {

	render() {
		<Tabbar ref="myTabbar" barColor={'gray'}>
			<Tab name="search">
			<IconWithBar label={"Search"} type={'e900'} from={'icomoon'}/>
			</Tab>
		</Tabbar>
	}

	static navigationDelegate = {
    id: 'RequestTabBar',
    navBarBackgroundColor: 'white',
  }

}
module.exports = RequestTabBar;