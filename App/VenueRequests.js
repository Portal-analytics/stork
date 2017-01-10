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
  TouchableOpacity,
  SegmentedControlIOS,
  Navigator,
  Modal,
} from 'react-native';
import Icons from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlaceARequest from './PlaceARequest';
import AcceptARequest from './AcceptARequest';

class VenueRequests extends React.Component {
  constructor(props){
    super(props);

    //prop = venue param
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      orderModalVisible: false,
      title: this.props.placeSelected,
      order: {},
    }
    this.requestRef = firebase.database().ref('requests/');
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForRequests(requestRef){
    var venue = 'Trin';
    var recentVenueRequests = [];
    var requestRef = firebase.database().ref('requests/');
    requestRef.on('value', (snap) => {

      snap.forEach((child) => {
        if(child.val().venue === this.props.selectedIndex){
          recentVenueRequests.push({
            altLocation: child.val().altLocation,
            complete: child.val().complete,
            order: child.val().order,
            status: child.val().status,
            uid: child.val().uid,
            venue: child.val().venue,
          });
        }
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(recentVenueRequests)
      });
  });

}

  componentDidMount(){
    this.listenForRequests(this.requestRef);
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

  figureOutWhatTheFuckIsGoingOn() {

    this.openOrderModal();
  }


  getAvailableRequests(index){

    return(
      <View style={styles.spacer}>

      <TouchableHighlight onPress={this.figureOutWhatTheFuckIsGoingOn.bind(this)}>
      <Text style={styles.menuItems}>{index.order}</Text>
      </TouchableHighlight>

      </View>
    )
  }

  closeOrderModal() {
    this.setState({
      orderModalVisible: false,
    });
  }

  openOrderModal() {

    this.setState({
      orderModalVisible: true,
    });
    //open a PlaceARequest modal, with props of whatever selected tab and
    // contentEditable === false
  }

  backToRequestList(){
    this.props.navigator.pop();
  }

  onOrderAccepted() {
    this.setState({
      orderModalVisible: false,
    })
    this.props.navigator.push({
      id: 'Tracker',
    });
  }

  render() {

    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: 'white'}}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                    {return (<View/>);},
                  RightButton: (route, navigator, index, navState) =>
                    { return (<View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={this.backToRequestList.bind(this)}>
                                  <Icon  style={{fontSize: 36, marginRight: 10, marginTop: 2,}} name="close" color={'red'}/>
                                </TouchableOpacity>
                              </View>);},
                  Title: (route, navigator, index, navState) =>
                    { return (<View><Text style={styles.title}>{this.props.selectedIndex}</Text></View>);},
                }} />
          } />
    );
  }

  renderScene() {
    console.log('from VR');
    console.log(this.props);
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
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.orderModalVisible}
        >
        <AcceptARequest  closeOrderModal={this.closeOrderModal.bind(this)} onOrderAccepted={this.onOrderAccepted.bind(this)}/>
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
    marginTop: 50,
  },
  navBar: {
    flex: 1,
    backgroundColor: '#A1CCDD',
  },
  navBarSpacing: {
    flex: 1,
    marginTop: 1,
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

module.exports = VenueRequests;
