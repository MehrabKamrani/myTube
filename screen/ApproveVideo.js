import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from './BaseScreen';
import { Video } from 'expo';


var styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default class ApproveVideo extends BaseScreen {

  constructor(props) {

   super(props)

   this.state = {

     videoID: '',
     videoPath: '',

   }

 }

 componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({
        videoID : this.props.navigation.state.params.VideoID,
        videoPath : ('http://192.168.1.103/reactPhp/images/' + this.props.navigation.state.params.VideoPath),
      })

    }

    static navigationOptions =
    {
     title: 'Approve Video',
   };


   convertToString = (s) => {
     let _path = s.toString();
     return _path;
   }

   approveVideo = () =>{

    fetch('http://192.168.1.103/reactPhp/approveVideo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        videoID : this.state.videoID,

      })

    }).then((response) => response.json())
    .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Approved') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'AdminProfile'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

              }

              rejectVideo = () =>{

                fetch('http://192.168.1.103/reactPhp/rejectVideo.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({

                    videoID : this.state.videoID,

                  })

                }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Success') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'AdminProfile'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

              }


              render() {

                const COLOR = '#92DCE5';
                let path = this.state.videoPath + "";
                console.log = path;
                const icon = (name, size = 36) => () =>
                <Ionicons
                name={name}
                size={size}
                color={COLOR}
                style={{ textAlign: 'center' }}
                />;
                return (
                  <View style={styles.container}>
                  <ScrollView style={styles.container}>
                  <VideoPlayer
                  videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: `${this.state.videoPath}`,
                    },
                    isMuted: false,
                  }}
                  playIcon={icon('ios-play-outline')}
                  pauseIcon={icon('ios-pause-outline')}
                  fullscreenEnterIcon={icon('ios-expand-outline', 28)}
                  fullscreenExitIcon={icon('ios-contract-outline', 28)}
                  trackImage={require('../assets/track.png')}
                  thumbImage={require('../assets/thumb.png')}
                  textStyle={{
                    color: COLOR,
                    fontSize: 12,
                  }}
                  isPortrait={this.state.isPortrait}
                  switchToLandscape={this.switchToLandscape.bind(this)}
                  switchToPortrait={this.switchToPortrait.bind(this)}
                  playFromPositionMillis={0}
                  />
                  </ScrollView>

                  <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Do you want to approve this video </Text>

                  <TextInput

                  placeholder="Video ID is shown here"

                  value={this.state.videoPath}

                  onChangeText={ TextInputValue => this.setState({videoID : TextInputValue }) }

                  underlineColorAndroid='transparent'

                  style={styles.TextInputStyleClass}
                  />


                  <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.approveVideo} >

                  <Text style={styles.TextStyle}> APPROVE  </Text>

                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.rejectVideo} >

                  <Text style={styles.TextStyle}> REJECT </Text>

                  </TouchableOpacity>


                  </View>

                  );
                }

              }

              const styles = StyleSheet.create({

                MainContainer :{

                  alignItems: 'center',
                  flex:1,
                  paddingTop: 30,
                  backgroundColor: '#fff'

                },

                photo: {
                  height: 180,
                  width: 350,
                  borderRadius: 20,
                },

                MainContainer_For_Show_StudentList_Activity :{

                  flex:1,
                  paddingTop: (Platform.OS == 'ios') ? 20 : 0,
                  marginLeft: 5,
                  marginRight: 5

                },

                TextInputStyleClass: {

                  textAlign: 'center',
                  width: '90%',
                  marginBottom: 7,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#FF5722',
                  borderRadius: 5 ,

                },

                TouchableOpacityStyle: {

                  paddingTop:10,
                  paddingBottom:10,
                  borderRadius:5,
                  marginBottom:7,
                  width: '90%',
                  backgroundColor: '#00BCD4'

                },

                TextStyle:{
                  color:'#fff',
                  textAlign:'center',
                },

                rowViewContainer: {
                  fontSize: 40,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }

              });
