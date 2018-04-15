import React from 'react';
import { ScrollView, View, TouchableHighlight, Text,Alert, TextInput, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from './BaseScreen';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';


export default class CustomScreen extends BaseScreen {
  constructor(props) {

       super(props);

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
  static navigationOptions =
    {
       title: 'Watch Video',
  };


  componentDidMount(){

    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      videoID : this.props.navigation.state.params.VideoID,
      videoPath : this.props.navigation.state.params.VideoPath,
    })


  }




  render() {
    const { width } = Dimensions.get('window');
    const COLOR = '#92DCE5';
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
      </View>
    );
  }
}




const styles = StyleSheet.create({
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
