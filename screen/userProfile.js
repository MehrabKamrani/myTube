import React, { Component } from 'react';
import { Text, View,ScrollView ,AppRegistry} from 'react-native';
import { TabNavigator } from 'react-navigation';
import axios from 'axios';

import VideoDetail from './VideoDetail';


class userProfile extends React.Component{

	state = { videos: [] };
	static navigationOptions= ({navigation}) =>({
		  title: 'Video List',
	});

	

componentWillMount() {
  //console.log('ComponentWillMount in AlbumList');
  axios.get('http://www.224tech.com/reactPhp/videolistJson.php')
    .then(response => this.setState({ videos: response.data }));
}

  renderVideos() {
   return this.state.videos.map(video =>
   	<VideoDetail key={video.VideoID} video={video} />);
  }

  render() {

  console.log(this.state);
    return (
      <ScrollView>
        {this.renderVideos()}
      </ScrollView>
    );
  }

}

class UploadVideo extends React.Component{
	static navigationOptions= ({navigation}) =>({
		  title: 'Upload Video',
	});
	render() {
	    return (
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        
	       
	      </View>
	    );
    }
}

export default TabNavigator({
	VideoList: { screen: userProfile },
  	UploadVideo: { screen: UploadVideo },
}, 
{
	
  	tabBarPosition: 'bottom',
  	swipeEnabled: false,
	
});

AppRegistry.registerComponent('userProfile', () => userProfile);
