import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,TouchableOpacity,TextInput,Button,Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class login extends Component {
	static navigationOptions= ({navigation}) =>({
		  title: 'Login',
	});
  constructor(props) {
    super(props);

    this.state = {
      TextInput_username: '',
      TextInput_password: '',
    };
  }

  displayMessage = () => {
    fetch('http://www.224tech.com/reactPhp/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userName : this.state.TextInput_username,
        userPassword : this.state.TextInput_password,

      })

    }).then((response) => response.json())
          .then((responseJson) => {

            if (responseJson == 'Member') {
              this.props.navigation.navigate("UserProfile");
							Alert.alert("Logged in successfully");
            } else if (responseJson == 'Admin') {
							this.props.navigation.navigate("AdminProfile");
							Alert.alert("Logged in successfully");
            } else {
							Alert.alert("Wrong! Please try again");
            }


          }).catch((error) => {
            console.error(error);
          });

  }


  render() {
    const { navigate } = this.props.navigation;

    return (

        <View style={styles.MainContainer}>

					<KeyboardAvoidingView behavior="padding">

	          <Text style={styles.TextTag}>
	              Login
	          </Text>

	          <TextInput style={styles.InputFlied}
	            placeholder="Enter Username"
	            onChangeText={TextInputValue =>
	              this.setState({ TextInput_username: TextInputValue })}
	          />

	          <TextInput secureTextEntry={true} style={styles.InputFlied}
	            placeholder="Enter Password"
	            onChangeText={TextInputValue =>
	              this.setState({ TextInput_password: TextInputValue })}
	          />
	          <Button style={styles.Buttons}
	            onPress={this.displayMessage} title="Submit" color="blue" />

	          <TouchableOpacity
	            onPress={()=> navigate('SignUP')}>
	            <Text style={styles.signUpBtnText}>Do not have account yet?</Text>
	          </TouchableOpacity>

					</KeyboardAvoidingView>

        </View>

    );
  }
  }


  const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    justifyContent: 'center',
    marginTop:30,
    marginLeft:30,
    marginRight:30,
    marginBottom:50
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


AppRegistry.registerComponent('login', () => login);
