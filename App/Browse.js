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
  Modal,
  SegmentedControlIOS,
} from 'react-native';
import PlaceARequest from './PlaceARequest';

class Browse extends React.Component {

  constructor(props) {
    super(props);
  //  var recentCheckins = {};

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      orderModalVisible: false,
    }
    this.checkinsRef = firebase.database().ref('checkins/');
    this.pushToSearchingForStork=this.pushToSearchingForStork.bind(this);
    this.closeOrderModal=this.closeOrderModal.bind(this);
  }

  getRef() {
    return firebase.database().ref();
  }

listenForStorks(checkinsRef){
//need vendor ref
//vendorsRef.on('value', (snap) =>{
//var recentCheckinVenues = [];
// snap.forEach((child) => {
//   if(child.val().checkInCount > 0){
//     recentCheckinVenues.push({
//       venue: child.val().venue,
//       checkInCount: child.val().checkInCount,
//     })
//   }
//
// })
// })

checkinsRef.on('value', (snap) => {
    var recentCheckins = [];
    snap.forEach((child) => {
      recentCheckins.push({
        active: child.val().active,
        destination: child.val().destination,
        uid: child.val().uid,
        _key: child.key,

      });
    });

    for(var i = 0; i < recentCheckins.length; i++){
      if(recentCheckins[i].active == false){
        recentCheckins.splice(i, 1);
      }
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(recentCheckins)
    });
  });
}
  componentDidMount(){

    this.listenForStorks(this.checkinsRef);
  }

_renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
  return(
    <View
    key={`${sectionID}-${rowID}`}
    style={{
      height: adjacentRowHighlighted ? 4 : 1,
      backgroundColor: adjacentRowHighlighted ? '#3B5998' : 'black',
    }}
    />
  );
}

closeOrderModal() {
  this.setState({
    orderModalVisible: false,
  });
}
  openOrderModal(){
    this.setState({

      orderModalVisible: !this.state.orderModalVisible,
    })
  }

  pushToSearchingForStork() {
    this.props.navigator.push({
      id: 'SearchingForStork',
    });
  }


  getAvailableStorks(index) {

    return(
      <View style={styles.spacer}>
      <TouchableHighlight onPress={this.openOrderModal.bind(this)}>
      <Text style={styles.menuItems}> {index.destination} </Text>
      </TouchableHighlight>
      </View>
    )
    //pulls available stork info from firebase and returns a list view
  }

  render() {


    return (
      <View style={styles.container}>
        <ScrollView>
        <ListView
        style={styles.picContainer}
        dataSource = {this.state.dataSource}
        renderSeparator = {this._renderSeperator}
        renderRow={(rowData) => this.getAvailableStorks(rowData)}
        >
        </ListView>
        </ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.orderModalVisible}
          >
          <PlaceARequest pushToSearchingForStork={this.pushToSearchingForStork} closeOrderModal={this.closeOrderModal}/>
        </Modal>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
  picContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navBar: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
  storeText: {
    fontSize: 32,
    fontFamily: 'Helvetica',
    marginLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    color: 'white',
  },
  dealText: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    paddingBottom: 5,
    marginLeft: 10,
    color: 'white',
  },
  welcomeHomePage: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
  },
  h1: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
  },
  menuItems: {
    fontSize: 25,
    fontFamily: 'Helvetica',
    color: 'black',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 5,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  storkLetters: {
    marginBottom: 45,
    marginLeft: 15,
  },
  picFormat: {
    alignSelf: 'center',
    width: 374,
    height: 130,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  picText: {
    textAlign: 'center',
    justifyContent: 'flex-end',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    height: 65,
    width: 374,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

module.exports = Browse;
