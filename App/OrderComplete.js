'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StarRating from 'react-native-simple-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import YANavigator from 'react-native-ya-navigator';

class OrderComplete extends React.Component {

  constructor() {
    super();
    this.state = {
    starCount: 3
    };
  }
  onStar(rating){
    this.setState({
      starCount: rating,
    })
  }

  render() {
    var time = new Date();
    return(
      <YANavigator.Scene
        delegate={this}
        style={styles.container}
        >
        <Text> {time.toString()} </Text>
        <Text> $17.38 </Text>
        <Text> delivered by </Text>
        <Text> (this.StorksProfilePic) </Text>
        <Text> (this.StorksName) -- (this.state.starCount) stars </Text>
        <StarRating
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStar(rating)}
        />
      </YANavigator.Scene>
      );
  }

  static navigationDelegate = {
    id: 'OrderComplete',
    navBarBackgroundColor: 'white',
  }
}

module.exports = OrderComplete;