'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Navigator
} from 'react-native';
import HomePage from './HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

class Settings extends React.Component{

	constructor(props) {
		super();
		this.state = {
			user: firebase.auth().currentUser,
		}
	}	

	onSaveChanges() {
		this.props.closeSettingsModal();
	}

	editPage() {

	}

	render() {

		return(
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          configureScene={(route) =>
            Navigator.SceneConfigs.FloatFromRight}
          navigationBar={
            <Navigator.NavigationBar 
              style={{backgroundColor: '#A1CCDD'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    { return (<View/>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.editPage.bind(this)}>
                                  <Text  style={{fontSize: 18, margin: 10}}>Edit</Text>
                                </TouchableOpacity>
                              </View>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}>Settings</Text></View>);},
                }} />
          } />
      );
	}

	renderScene() {
		return(
			<View style={styles.container}>
				<Text>Settings</Text>
				<TouchableOpacity style={styles.saveButton} onPress={this.onSaveChanges.bind(this)}>
					<Text style={styles.saveText}>Save</Text>
				</TouchableOpacity>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		justifyContent: 'center',
	},
	container: {
		marginTop: 65,
	},
	saveText: {
		fontSize: 22,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	saveButton: {
		height: 36,
		width: 200,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#ff8000',
		borderColor: '#ff8000',
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'center',
		justifyContent: 'center',
		paddingRight: 10,
		paddingLeft: 10,
	},
});

module.exports = Settings;