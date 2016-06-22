import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  NavigatorIOS,
} from 'react-native';

class Login extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          stork
        </Text>
        <Image source={require('storklogo.jpg')} style={styles.logoImage}/>
        <TextInput
        onChangeText={(text) => this.setState({ text })}
        style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
        placeholder = "Username"
        autoCapitalize = "none"

        />
        <TextInput
        onChangeText={(text) => this.setState({ text })}
        style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
        placeholder = "Password"
        secureTextEntry = "true"
        />

        <View style={styles.submitView}>
        <TouchableHighlight onPress = {this.whenClicked()}>
        <Text style={styles.submit}> Submit </Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.welcome}> Dont have an account? Stop being a little bitch and sign up</Text>

      </View>
    );
  }
}
