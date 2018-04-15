import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator , Dimensions} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from './BaseScreen';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default class DeleteVideo extends BaseScreen {

  constructor(props) {

   super(props)

   this.state = {

     videoID: '',
     videoPath: '',
      mute: false,
      shouldPlay: false,

   }

 }
    handlePlayAndPause = () => {
     this.setState((prevState) => ({
        shouldPlay: !prevState.shouldPlay
     }));
    }

    handleVolume = () => {
     this.setState(prevState => ({
       mute: !prevState.mute,
     }));
    }
 componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        videoID : this.props.navigation.state.params.VideoID,

        videoPath : this.props.navigation.state.params.VideoPath,

      })

    }

    static navigationOptions =
    {
     title: 'Watch Video',
   };


    deleteVideo = () =>{
    fetch('http://www.224tech.com/reactPhp/deleteVideo.php', {
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

                  if (responseJson == 'Deleted') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'ManageVideos'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });
              }


             

              render() {
                const { width } = Dimensions.get('window');
                const COLOR = '#92DCE5';
                let path = "bb.mp4";
                console.log = path;
                const icon = (name, size = 36) => () =>
                <Ionicons
                name={name}
                size={size}
                color={COLOR}
                style={{ textAlign: 'center' }}
                />;
                return (
                  <View style={styles.Maincontainer}>
                  <ScrollView style={styles.container}>

                  <Video
                      source={{ uri: `http://www.224tech.com/reactPhp/videos/${this.state.videoPath }`}}
                      shouldPlay={this.state.shouldPlay}
                      resizeMode="cover"
                      style={{ width, height: 300 }}
                      isMuted={this.state.mute}
                  />
                  <View style={styles.controlBar}>
                             <MaterialIcons
                               name={this.state.mute ? "volume-mute" : "volume-up"}
                               size={45}
                               color="white"
                               onPress={this.handleVolume}
                             />
                             <MaterialIcons
                               name={this.state.shouldPlay ? "pause" : "play-arrow"}
                               size={45}
                               color="white"
                               onPress={this.handlePlayAndPause}
                             />
                  </View>

                  </ScrollView>

                  <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Do you want to approve this video </Text>

                  <TextInput

                  placeholder="Video ID is shown here"

                  value={this.state.videoPath}

                  onChangeText={ TextInputValue => this.setState({videoID : TextInputValue }) }

                  underlineColorAndroid='transparent'

                  style={styles.TextInputStyleClass}
                  />




                  <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.deleteVideo} >

                  <Text style={styles.TextStyle}> DELETE </Text>

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
                },
                backgroundVideo: {
                  width: 300,
                  height: 300,
                },
                photo: {
                  flex:1,
                  marginTop:5,
                  marginBottom: 20,
                  height: 200,
                  width: '100%',
                  borderRadius: 20,
                },
                controlBar: {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 45,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },

              });