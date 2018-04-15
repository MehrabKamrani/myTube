import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator} from 'react-native';
import b64 from 'base64-js';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Exponent, { Constants, ImagePicker, registerRootComponent, Video } from 'expo';

import Row from '../components/Row'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'


export default class showAllVideos extends Component{

 constructor(props) { 

    super(props);

    this.state = {

      isLoading: true

    }
  }


static navigationOptions= ({navigation}) =>({
		  title: 'All Videos',
	});

 GetVideoIDFunction=(VideoID, Title, Description, NumViews, VideoPath)=>{
  this.props.navigation.navigate('DeleteVideo', { 
    VideoID : VideoID,
    Title : Title,
    Description : Description,
    NumViews : NumViews,
    VideoPath : VideoPath

    });
  }

  onPressButton = () => {
    console.log(this.state.contentSearch);
    let formData = new FormData();
     formData.append('videoTitle', this.state.contentSearch);
    
  fetch('http://www.224tech.com/reactPhp/selectSpecificVideo.php', {
            method: 'POST',
            body: formData,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        
        })
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
       
         });
  }
  
  componentDidMount() {
    
       return fetch('http://www.224tech.com/reactPhp/videolistJson.php')
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
    <TextInput
      style={styles.input}
      placeholder="Search Text..."
      onChangeText={(text) => this.setState({ contentSearch : text })}
    />
    <Button
      onPress={this.onPressButton}
      title="Search"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
      
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(Data) => 
            <View style={styles.container}>
              <Video source={{ uri: `http://www.224tech.com/reactPhp/videos/${Data.VideoPath}` }}
              resizeMode="cover"
              shouldPlay={false}
              style={styles.photo}
              />
              <Text style={styles.text} onPress={this.GetVideoIDFunction.bind(this,Data.VideoID)}>
                {`Title:${Data.Title} Views: ${Data.NumViews}`}
                
              </Text>
              </View>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}          
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}/>
      
      </View>
    );
  }
}

    

const styles = StyleSheet.create({

   container: {
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
    },

    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },

    photo: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },



  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});


