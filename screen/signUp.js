import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class signUp extends Component {
	static navigationOptions= ({navigation}) =>({
			title: 'Sign Up',
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_fullname: '',
      TextInput_username: '',
      TextInput_email: '',
      TextInput_password: '',
    };
  }

  displayMessage = () => {
    fetch('http://10.125.193.121/mytube_react/signUp.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userFullname : this.state.TextInput_fullname,
        userName : this.state.TextInput_username,
        userEmail : this.state.TextInput_email,
        userPassword : this.state.TextInput_password,

      })

      }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
            console.error(error);
          });

}


  render() {
    return (

        <View style={styles.MainContainer}>

          <Text style={styles.TextTag}>
              Sign Up
          </Text>

          <TextInput style={styles.InputFlied}
            placeholder="Enter Username"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_username: TextInputValue })}
          />

           <TextInput style={styles.InputFlied}
            placeholder="Email"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_email: TextInputValue })}
          />

          <TextInput style={styles.InputFlied}
            placeholder="Enter Password"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_password: TextInputValue })}

          />

           <TextInput style={styles.InputFlied}
            placeholder="Date Of Brith"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_dob: TextInputValue })}
          />

           <TextInput style={styles.InputFlied}
            placeholder="Gender"
            onChangeText={TextInputValue =>
              this.setState({ TextInput_gender: TextInputValue })}
          />
          <Button style={styles.Buttons}
            onPress={this.displayMessage} title="Sign UP" color="blue" />
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
  }
});

AppRegistry.registerComponent('signUp', () => signUp);
