import React, { Component } from 'react';
import b64 from 'base64-js';
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';

export default class ShowAllMembers extends Component {

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true

    }
  }

  static navigationOptions =
  {
     title: 'Select for Update/Delete',
  };

  componentDidMount() {

       return fetch('http://224tech.com/reactPhp/showAllMember.php')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

     GetStudentIDFunction=(id,username,fullname, email,password, isVerified)=>{

          this.props.navigation.navigate('UpdateDeleteMember', {

            id : id,
            username : username,
            name : fullname,
            email : email,
            password : password,
            isVerified: isVerified
          });

     }

     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }

     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (

        <View style={styles.MainContainer_For_Show_PokemonList_Activity}>

          <ListView

            dataSource={this.state.dataSource}

            renderSeparator= {this.ListViewItemSeparator}

            renderRow={ (rowData) => <Text style={styles.rowViewContainer}

                      onPress={this.GetStudentIDFunction.bind(
                        this,
                         rowData.id,
                         rowData.username,
                         rowData.fullname,
                         rowData.email,
                         rowData.password,
                         rowData.isVerified
                         )} >

                      {rowData.fullname}

                      </Text> }

          />

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
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});
