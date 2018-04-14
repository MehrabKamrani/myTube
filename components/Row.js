import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Video} from 'expo';

const styles = StyleSheet.create({
  container: {
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


const Row = (props) => (
  <View style={styles.container}>
   <Video source={{ uri: `http://www.224tech.com/reactPhp/videos/${props.VideoPath}` }}
    resizeMode="cover"
    shouldPlay={false}
    style={styles.photo}
  />
   
    <Text style={styles.text}>
      {`Title:${props.Titel}`}
    </Text>
    <Text style={styles.text}>
     {`Views: ${props.NumViews}`}
     </Text>
  </View>
);

export default Row;