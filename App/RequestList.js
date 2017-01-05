'use strict'
import React, {Component} from 'react';
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
  Modal,
  Navigator,
} from 'react-native';
import VenueRequests from './VenueRequests';
import Icons from 'react-native-vector-icons';

class RequestList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      requestModalVisible: false,
      place: '',
    }

    // var sorter = '';
    // if(this.props.sortBy === '$$$'){
    //   sorter = 'orderByChild(venue)'
    // }

    this.requestsRef = firebase.database().ref('requests/');

  }



  getRef() {
    return firebase.database().ref();
  }

  listenForRequests(requestsRef){
    requestsRef.on('value', (snap) => {
      var recentRequests = [];
      snap.forEach((child) => {

        if(recentRequests.length === 0){
          recentRequests.push(child.val().venue);
        }
        if(recentRequests.indexOf(child.val().venue) > -1){
            console.log('its there...somewhere');
            console.log(recentRequests.indexOf(child.val().venue));
          } else {
            recentRequests.push(child.val().venue);
            console.log('pushed it real good.')
          }

        // recentRequests.push({
        //   altLocation: child.val().altLocation,
        //   complete: child.val().complete,
        //   order: child.val().order,
        //   status: child.val().status,
        //   uid: child.val().uid,
        //   venue: child.val().venue,
        //   // change to vendor fields
        //   // name
        //   // # active checkins
        //   // location?
        // });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(recentRequests)
      });
    });
  }

  componentDidMount(){
    this.listenForRequests(this.requestsRef);
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
    return(
      <View
      key={`${sectionID}-${rowID}`}
      style= {{
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: adjacentRowHighlighted ? '#3B5998' : 'black'
      }}
      />
    );
  }


  getAvailableRequests(index){
    var selectedIndex = index;
    return(
      <View style={styles.spacer}>
      <TouchableHighlight onPress={this.props.goToVenueRequests.bind(this, selectedIndex)}>
      <Text style={styles.menuItems}>{index}</Text>
      </TouchableHighlight>
      </View>
    )
  }

  openRequestModal(){

    this.setState({
      place: this.placeSelected,
      requestModalVisible: true,
    });
  }
  closeRequestModal() {
    this.setState({
      requestModalVisible: false,
    });
  }
  pushToOrderAccepted(){
    this.props.navigator.push({
      id: 'OrderAccepted'
    })
  }

  render() {

    return(
      <View style={styles.container}>
      <ScrollView>
      <ListView
      style={styles.picContainer}
      dataSource={this.state.dataSource}
      renderSeparator={this._renderSeperator}
      renderRow={(rowData) => this.getAvailableRequests(rowData)}
      >

      </ListView>

      </ScrollView>
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

module.exports = RequestList;
