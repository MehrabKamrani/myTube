import React, { Component } from 'react';
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class ApproveVideo extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         Text_VideoID: '',
         
       }
    
     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        Text_VideoID : this.props.navigation.state.params.VideoID,
      })

     }
  
    static navigationOptions =
    {
       title: 'Approve Video',
    };

    approveVideo = () =>{

            fetch('http://10.125.195.247/reactPhp/approveVideo.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              videoID : this.state.Text_VideoID,

            })

            }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Approved') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'AdminProfile'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

      }

    rejectVideo = () =>{

            fetch('http://10.125.195.247/reactPhp/rejectVideo.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              videoID : this.state.Text_VideoID,

            })

            }).then((response) => response.json())
                .then((responseJson) => {

                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                  if (responseJson == 'Success') {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'AdminProfile'})]
                    }));
                  }

                }).catch((error) => {
                  console.error(error);
                });

      }


  
    
    render() {

      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Do you want to approve this video </Text>
    
          <TextInput
            
            placeholder="Video ID is sown here"
            
            value={this.state.Text_VideoID}
   
            onChangeText={ TextInputValue => this.setState({Text_VideoID : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
       
   
        
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.approveVideo} >
   
            <Text style={styles.TextStyle}> APPROVE  </Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.rejectVideo} >
   
            <Text style={styles.TextStyle}> REJECT </Text>
   
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

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

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
    fontSize: 40,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});