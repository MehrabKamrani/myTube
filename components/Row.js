import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Video} from 'expo';
import { StackNavigator } from 'react-navigation';

//import ApproveVideo from '../screen/ApproveVideo'


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

GetVideoIDFunction=(VideoID, Titel, Description, NumViews, VideoPath)=>{

  props.navigation.navigate('ApproveVideo', { 

    VideoID : VideoID,
    Titel : Titel,
    Description : Description,
    NumViews : NumViews,
    VideoPath : VideoPath

  });

}


const Row = (props) => (
 <View style={styles.container}>
 <Video source={{ uri: `http://10.125.195.247/reactPhp/images/${props.VideoPath}` }}
 resizeMode="cover"
 shouldPlay={false}
 style={styles.photo}
 />
 
 <Text style={styles.text}
 onPress={this.GetVideoIDFunction.bind(
  this,props.VideoID, 
  props.Titel,  
  props.Description,
  props.NumViews,
  props.VideoPath
  )} > 
  {`${props.VideoID} ${props.Titel}`}
  </Text>
  </View>
  );

  export default Row;
