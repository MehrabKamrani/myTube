import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableOpacity, Alert} from 'react-native';
import {Video} from 'expo';
import Card from './Card';
import CardSection from './CardSection';




const VideoDetail = ({ video }) => {

  const { VideoID, Titel } = video;
  const { thumbnailStyle,
          headerContentSyle,
          thContainerStyle,
          headerTextStyle,
          imageStyle } = styles;

  return (
    //const { navigate } = this.props.navigation Alert.alert('Clicked');
    
      <Card>
        <CardSection>
          <View style={thContainerStyle}>
            <Video
              style={thumbnailStyle}
              source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            />
          </View>

          <View style={headerContentSyle}>
              <Text style={headerTextStyle}>{VideoID}</Text>
              <Text>{Titel}</Text>
          </View>

        </CardSection>  

        <CardSection>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            isLooping
            style={{ width: 390, height: 300 }}
          />
        </CardSection>    

      </Card>
   
  );
};

const styles = {
  headerContentSyle: {
    //paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default VideoDetail;