import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,TouchableOpacity,TextInput,Button,Keyboard, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class activation extends Component {
	static navigationOptions= ({navigation}) =>({
		  title: 'Account Activation',
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_tac: '',
    };
  }

  displayMessage = () => {
    fetch('http://192.168.0.14/videoStreaming/check_tac.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        tac : this.state.TextInput_tac,

      })

    }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

            if (responseJson == 'Congratulations! Your account has been activated!') {
              this.props.navigation.navigate("UserProfile");
            }

          }).catch((error) => {
            console.error(error);
          });

  }


  render() {
    const { navigate } = this.props.navigation;

    return (

        <View style={styles.MainContainer}>

          <Text style={styles.TextTag}>
              Login
          </Text>

          <TextInput style={styles.InputFlied}
            placeholder="Enter TAC number"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_tac: TextInputValue })}
          />

          <Button style={styles.Buttons}
            onPress={this.displayMessage} title="Submit" color="blue" />

        </View>

    );
  }
  }


  const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    justifyContent: 'center',
    margin:30
  },
  TextTag:{
    fontSize: 27,
    margin: 20,
    textAlign:'center'
  },
  InputFlied: {
    margin: 10,
    padding: 10
  },
  Buttons: {
    fontSize: 50,
    margin: 10,
    padding: 50
  },
  signUpbutton:{
		padding:10,margin:10,width:'95%'
	},


  });


AppRegistry.registerComponent('activation', () => activation);
