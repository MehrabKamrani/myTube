import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import AddMember from './addMember';
import ShowAllMembers from './showAllMembers';
import UpdateDeleteMember from './updateDeleteMember';


class ManageVideos extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Videos!</Text>
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


export default TabNavigator({
  ManageVideos: { screen: ManageVideos },
  ManageMembers: { screen: ManageMemberStack },
});

AppRegistry.registerComponent('adminProfile', () => adminProfile);
