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
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'


class ManageVideos extends Component {


   constructor(props) {

    super(props);

    this.state = {

      isLoading: true

    }
  }


  static navigationOptions= ({navigation}) =>({
    title: 'Manage Videos',
  });


GetVideoIDFunction=(VideoID, Title, Description, NumViews, VideoPath)=>{
  this.props.navigation.navigate('ApproveVideo', {
    VideoID : VideoID,
    Title : Title,
    Description : Description,
    NumViews : NumViews,
    VideoPath : VideoPath

    });
  }

ListViewItemSeparator = () => {
 return (
   <View
   style={{
     height: .5,
     width: "100%",
     backgroundColor: "#000",
   }}
   />
   );
}

componentDidMount() {


 return fetch('http://224tech.com/reactPhp/videolistJson.php')

 .then((response) => response.json())
 .then((responseJson) => {
   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.setState({
     isLoading: false,
     dataSource: ds.cloneWithRows(responseJson),
   }, function() {
             // In this block you can do something with new state.
           });
 })
 .catch((error) => {
   console.error(error);
 });
}



  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
        </View>
        );
      }

      return (
      <View style={styles.container}>


      <ListView
      dataSource={this.state.dataSource}

    renderRow={(rowData) =>
      <View style={styles.container}>
      <Video source={{ uri: `http://224tech.com/reactPhp/videos/${rowData.VideoPath}` }}

      resizeMode="cover"
      shouldPlay={false}
      style={styles.photo}
      />

      <Text style={styles.text}
      onPress={this.GetVideoIDFunction.bind(
        this,rowData.VideoID,
        rowData.Title,
        rowData.Description,
        rowData.NumViews,
        rowData.VideoPath
        )} >

        {rowData.VideoID}
        {rowData.Title}
        </Text>
        </View>}

        renderSeparator= {this.ListViewItemSeparator}
        renderFooter={() => <Footer />}
        renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />

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
    ManageVideos: { screen: ManageVideos },
    ApproveVideo: { screen: ApproveVideo },
  });

  export default TabNavigator({
    ManageVideoStack: { screen: ManageVideoStack },
    ManageMembers: { screen: ManageMemberStack },
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
