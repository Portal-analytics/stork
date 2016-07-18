'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Navigator,
  Alert,
} from 'react-native';
import HomePage from './HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import LoginPage from './LoginPage';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';


class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: this.props.result.first_name,
      lastName: this.props.result.last_name,
      verifyPassword: '',
      loaded: true,
      phoneNumber: '',
      profilePic: this.props.result.picture.data.url,
    };

  }

  pushtoHomePage(uid) {
    var database = firebase.database();
    var usersRef = database.ref('users/')
    usersRef.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      uid: uid,
      profilePic: this.state.profilePic,
      phoneNumber: this.state.phoneNumber,
    });
    this.props.navigator.push({
      id: 'HomePage',
    });
    Alert.alert('Account created!', 'Get Storkin!');
  }


  createUser(pushtoHomePage) {
    var createAccount = true;

    var _this = this;
    if (this.state.password === this.state.verifyPassword && this.state.firstName != '' && this.state.lastName != '' && this.state.phoneNumber != '' && this.state.email.slice(-3) === 'edu') {
      const {email, password} = this.state
        this.setState({
          loaded: false,
          email: this.state.email,
          password: this.state.password,
        });


        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user){
          _this.pushtoHomePage(user.uid);
        })
        .catch(function(error){
          if(error){
            createAccount=false;
            switch(error.code){
              case "auth/email-already-in-use":
              Alert.alert('Hold the phone.', 'Account cannot be created because email is already in use.');
              break;
              case "auth/invalid-email":
              Alert.alert("Not a '.edu' address!",'The email is not valid (make sure its a .edu address)');
              break;
              case "auth/weak-password":
              Alert.alert('Password Error', 'Account cannot be created because password is too weak.')
              break;
              default:
              Alert.alert('Error', 'Error creating user ' + error.code);

            }
          }

        });

    } else if (this.state.email.slice(-3) != 'edu') {
      Alert.alert('Email not Valid', "You must sign up with a '.edu' address!", [{text: "I wont't do it again."}]);
    } else if (this.state.password != this.state.verifyPassword) {
      Alert.alert('Must Verify Password!', 'Make sure your passwords are the same in both fields!')
    }
    else {
      Alert.alert('Hold your horses!', 'You must fill out all fields!');
    }
    // this.props.navigator.push({
    //   id: 'FacebookLogin',
    // });

  }


  render() {

    return(
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#A1CCDD'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    { return (<TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                                  onPress={() => this.props.navigator.pop()}>
                                <Icon  style={{fontSize: 24, margin: 10}} name="chevron-left" color={'gray'}/>
                              </TouchableOpacity>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View/>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}>Stork</Text></View>);},
                }} />
          } />
      );
  }

  renderScene() {
    var pic = this.state.profilePic.toString();
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
        value={this.state.firstName}
        onChangeText={(firstName) => this.setState({ firstName })}

        ref='firstNameVal'
        style={styles.textEntry}
        placeholder = 'First Name'
        autoCapitalize = "none"

        />
        <TextInput
        value={this.state.lastName}
        onChangeText={(lastName) => this.setState({ lastName })}

        ref='lastNameVal'
        style={styles.textEntry}
        placeholder = 'Last Name'
        autoCapitalize = "none"

        />
        <TextInput
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}

        ref='emailVal'
        style={styles.textEntry}
        placeholder = 'University E-mail'
        autoCapitalize = "none"

        />
        <TextInput
        value={this.state.phoneNumber}
        onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
        keyboardType = 'numeric'
        ref='phoneNumberVal'
        style={styles.textEntry}
        placeholder = '(888)-888-8888'
        autoCapitalize = "none"

        />
        <TextInput
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        onSubmitEditing={this.writeUserData}
        style={styles.textEntry}
        placeholder = "Password"
        ref='passVal'
        secureTextEntry ={true}
        />
        <TextInput
        value={this.state.verifyPassword}
        onChangeText={(verifyPassword) => this.setState({ verifyPassword })}
        onSubmitEditing={this.writeUserData}
        style={styles.textEntry}
        placeholder = "Verify"
        ref='passVal'
        secureTextEntry ={true}
        />
        <Image style={styles.facebookButton} source={{uri: pic}} ></Image>

        <View style={styles.facebookButton}>
          <TouchableOpacity style={styles.continueButton} onPress={this.createUser.bind(this)}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 64,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: '#ff8000',
  },
  facebookButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  textEntry: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 5,
    alignSelf: 'stretch',
  },
  topInputText: {
    fontSize: 20,
    left: 0,
    marginLeft: 15,
  },
  facebookText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
    marginRight: 25,
    marginLeft: 25,
    justifyContent: 'center',
    textAlign: 'center'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 15
  },
  continueButton: {
    height: 36,
    width: 200,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#A1CCDD',
    borderColor: '#A1CCDD',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  continueText: {
    fontSize: 22,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

module.exports = SignUp;
