import React from 'react';
import { ScrollView, View, TouchableHighlight, Text,Alert, TextInput} from 'react-native';
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

export default class CustomScreen extends BaseScreen {
  constructor(props) {

       super(props);

       this.state = {

         Text_VideoID: '',
         Text_VideoPath: ''
       }

  }

  static navigationOptions =
    {
       title: 'Watch Video',
  };


  componentDidMount(){

    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      Text_VideoID : this.props.navigation.state.params.VideoID,
      Text_VideoPath: this.props.navigation.state.params.VideoPath,      
    })

    
  }

  componentDidUpdate(){
    this.updatingViews(this) ;
  }

  updatingViews =() =>{

          fetch('http://www.224tech.com/reactPhp/slectVideo.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            videoID : this.state.Text_VideoID,

          })

          }).then((response) => response.json())
              .then((responseJson) => {

                // Showing response message coming from server updating records.
                Alert.alert(responseJson);                 
                

              }).catch((error) => {
                console.error(error);
              });
  }


  render() {
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
        
          <VideoPlayer
            videoProps={{
              shouldPlay: false,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: `${this.state.Text_VideoPath}`,
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
          <TextInput placeholder="Video ID is sown here"
            
           value={this.state.Text_VideoID}
   
            onChangeText={ TextInputValue => this.setState({Text_VideoID : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            
          />

          <TextInput placeholder="Video ID is sown here"
            
           value={this.state.Text_VideoPath}
   
            onChangeText={ TextInputValue => this.setState({Text_VideoPath : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            
          />
        </ScrollView>
      </View>
    );
  }
}