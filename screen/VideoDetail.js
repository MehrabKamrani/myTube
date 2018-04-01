import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
//import Button from './Button';

const VideoDetail = ({ video }) => {

  const { VideoID, Titel } = video;
  const { thumbnailStyle,
          headerContentSyle,
          thContainerStyle,
          headerTextStyle,
          imageStyle } = styles;
  return (
    <Card>

      <CardSection>

        <View style={headerContentSyle}>
            <Text style={headerTextStyle}>{VideoID}</Text>
            <Text>{Titel}</Text>
        </View>

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