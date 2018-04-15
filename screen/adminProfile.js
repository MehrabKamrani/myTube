import React, { Component } from 'react';
import {Alert, Platform, ActivityIndicator, ListView, AppRegistry,View,Text,StyleSheet, Button }
from 'react-native';
import b64 from 'base64-js';
import {Video} from 'expo';
import { StackNavigator, TabNavigator, SwitchNavigator} from 'react-navigation';

import AddMember from './addMember';
import ShowAllMembers from './showAllMembers';
import UpdateDeleteMember from './updateDeleteMember';

//import Row from '../components/Row'
import ApproveVideo from './ApproveVideo'
import DeleteVideo from './DeleteVideo'
import showNotApprovedVideos from './showNotApprovedVideos'
import showAllVideos from './showAllVideos'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'


class ManageVideos extends Component {

   render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Approve/Reject Video" onPress={() => this.props.navigation.navigate('showNotApprovedVideos')} />
          <Button title="Watch Videos" onPress={() => this.props.navigation.navigate('showAllVideos')} />
        </View>
      );
    }
  }




  class ManageMembers extends Component {

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  				<Button title="Add Member" onPress={() => this.props.navigation.navigate('AddMember')} />
  				<Button title="Update/Delete Member" onPress={() => this.props.navigation.navigate('ShowAllMembers')} />
        </View>
      );
    }
  }

  const ManageMemberStack = StackNavigator({
    ManageMembers: { screen: ManageMembers },
    AddMember: { screen: AddMember },
  	ShowAllMembers: { screen: ShowAllMembers },
  	UpdateDeleteMember: { screen: UpdateDeleteMember },
  });

  const ManageVideoStack = StackNavigator({
    ManageVideos : { screen: ManageVideos},
    showNotApprovedVideos: { screen: showNotApprovedVideos },
    showAllVideos: { screen: showAllVideos },
    ApproveVideo: {screen: ApproveVideo},
    DeleteVideo: {screen: DeleteVideo},
  });

  export default TabNavigator({
    ManageVideoStack: { screen: ManageVideoStack },
    ManageMembers: { screen: ManageMemberStack },
  },
    {
  
    tabBarPosition: 'bottom',
    swipeEnabled: false,
  
});


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },
    input: {
      height: 30,
      flex: 1,
      paddingHorizontal: 8,
      fontSize: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
    },
  text: {
    marginLeft: 12,
    padding: 20,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  });
