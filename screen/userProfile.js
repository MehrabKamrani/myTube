import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class userProfile extends Component{
static navigationOptions= ({navigation}) =>({
  title: 'Welcome',
});

	render(){
		const { navigate } = this.props.navigation;
		return(
	  	<View style={styles.container}>

				<Text style={styles.pageName}>Member Profile</Text>

      </View>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


AppRegistry.registerComponent('userProfile', () => userProfile);
