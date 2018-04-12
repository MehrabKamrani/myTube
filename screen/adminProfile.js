import React, { Component } from 'react';
import {Alert, Platform, ActivityIndicator, ListView, AppRegistry,View,Text,StyleSheet } 
from 'react-native';
import b64 from 'base64-js';
import { StackNavigator } from 'react-navigation';


//import Row from '../components/Row'
import ApproveVideo from './ApproveVideo'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'

export default class adminProfile extends Component{

 constructor(props) { 

  super(props);

  this.state = {

    isLoading: true

  }
}


static navigationOptions= ({navigation}) =>({
  title: 'Welcome, Admin',
});


GetVideoIDFunction=(VideoID, Titel, Description, NumViews, VideoPath)=>{
  this.props.navigation.navigate('ApproveVideo', { 
    VideoID : VideoID,
    Titel : Titel,
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

 return fetch('http://10.125.195.247/reactPhp/videolistJson.php')
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
   
    renderRow={(rowData) => <Text style={styles.text}
    onPress={this.GetVideoIDFunction.bind(
          this,rowData.VideoID, 
          rowData.Titel,  
          rowData.Description,
          rowData.NumViews,
          rowData.VideoPath
          )} > 

          {rowData.VideoID} 
          {rowData.Titel}
      </Text>}
      
      renderSeparator= {this.ListViewItemSeparator}
      renderFooter={() => <Footer />}
      renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
      />
      </View>
      );
    }


  }


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



  AppRegistry.registerComponent('adminProfile', () => adminProfile);

