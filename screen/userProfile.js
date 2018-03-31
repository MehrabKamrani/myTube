import React from 'react';
import { Text, View ,AppRegistry} from 'react-native';
import { TabNavigator } from 'react-navigation';


class userProfile extends React.Component{
	static navigationOptions= ({navigation}) =>({
		  title: 'Welcome',
	});

	render() {
	    return (
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>Settings!</Text>
	       
	      </View>
	    );
    }
}

class UploadVideo extends React.Component{
	render() {
	    return (
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>Settings!</Text>
	       
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
});

AppRegistry.registerComponent('userProfile', () => userProfile);
