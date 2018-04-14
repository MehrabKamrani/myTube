import React, { Component } from 'react';
import b64 from 'base64-js';
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator, Switch } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

export default class UpdateDeleteMember extends Component {

  constructor(props) {

       super(props)

       this.state = {

         TextInput_ID: '',
         TextInput_Username: '',
         TextInput_Fullname: '',
         TextInput_Email: '',
         TextInput_Password: '',
         Switch_IsVerified: false

       }

     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({
        TextInput_ID : this.props.navigation.state.params.id,
        TextInput_Username : this.props.navigation.state.params.username,
        TextInput_Fullname: this.props.navigation.state.params.name,
        TextInput_Email: this.props.navigation.state.params.email,
        TextInput_Password: this.props.navigation.state.params.password,
        Switch_IsVerified: (this.props.navigation.state.params.isVerified == 1),

      })

     }

    static navigationOptions =
    {
       title: 'Update/Delete',
    };

    UpdateMemberRecord = () =>{

            fetch('http://10.125.196.4/videoStreaming/updateMember.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id : this.state.TextInput_ID,

              username : this.state.TextInput_Username,

              fullname : this.state.TextInput_Fullname,

              email : this.state.TextInput_Email,

              password : this.state.TextInput_Password,

              isVerified : (this.state.Switch_IsVerified==true) ? 1 : 0


            })

            }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Updated Successfully!') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

      }


    DeleteMemberRecord = () =>{

          fetch('http://10.125.196.4/videoStreaming/deleteMember.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            username : this.state.TextInput_Username

          })

          }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
             console.error(error);
          });


          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ManageMembers'})]
          }));

      }

      SwitchGo(value){
        this.setState({
          Switch_IsVerified:value
        });
      }


    render() {
      return (

   <View style={styles.MainContainer}>

          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Member Record Form </Text>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Username:</Text>
            <TextInput

              placeholder="Username"

              value={this.state.TextInput_Username}

              onChangeText={ TextInputValue => this.setState({ TextInput_Username : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Fullname:</Text>
            <TextInput

              placeholder="Fullname"

              value={this.state.TextInput_Fullname}

              onChangeText={ TextInputValue => this.setState({ TextInput_Fullname : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Email:</Text>
            <TextInput

              placeholder="Email"

              value={this.state.TextInput_Email}

              onChangeText={ TextInputValue => this.setState({ TextInput_Email : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Password:</Text>
            <TextInput

              placeholder="Password"

              value={this.state.TextInput_Password}

              onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }

              underlineColorAndroid='transparent'

              style={styles.TextInputStyleClass}
            />
          </View>

          <View style={styles.RowWrapper}>
            <Text style={styles.RowLabel}>Verified?</Text>
            <Switch
              value = {this.state.Switch_IsVerified}
              onValueChange={(value) => this.SwitchGo(value)}
            />
          </View>
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateMemberRecord} >

            <Text style={styles.TextStyle}> UPDATE </Text>

         </TouchableOpacity>

         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteMemberRecord} >

            <Text style={styles.TextStyle}> DELETE </Text>

         </TouchableOpacity>


   </View>

      );
    }

}
const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  RowWrapper :{
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  RowLabel :{
    width: '25%',
  },

  TextInputStyleClass: {
  width: '75%',
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,
  paddingLeft: 10,
  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});
