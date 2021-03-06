import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, Alert, TextInput, Button, Text,
  Platform, TouchableOpacity, ListView, ActivityIndicator} from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import Exponent, { Constants, ImagePicker, registerRootComponent, Video } from 'expo';
//import axios from 'axios';
import VideoDetail from './VideoDetail';
import WatchVideo from './WatchVideo';
import Row from '../components/Row'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'


class userProfile extends Component{
	static navigationOptions= ({navigation}) =>({
    title: 'Video List',
  });
  constructor(props) {
    super(props);

  this.state = {

      isLoading: true,
    contentSearch: 'aaa',

    }
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

  GetVideoIDFunction=(VideoID, Title, Description, NumViews, VideoPath)=>{
    this.updatingViews(VideoID);
    this.props.navigation.navigate('WatchVideo', {
      VideoID : VideoID,
      Title : Title,
      Description : Description,
      NumViews : NumViews,
      VideoPath : VideoPath

    });
  }
  updatingViews =(videoId) =>{

          fetch('http://www.224tech.com/reactPhp/slectVideo.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            videoID : videoId,

          })

          }).then((response) => response.json())
              .then((responseJson) => {

                // Showing response message coming from server updating records.
                Alert.alert(responseJson);


              }).catch((error) => {
                console.error(error);
              });
  }

  onPressButton = () => {
    console.log(this.state.contentSearch);
    let formData = new FormData();
     formData.append('videoTitle', this.state.contentSearch);

  fetch('http://www.224tech.com/reactPhp/selectSpecificVideo.php', {
            method: 'POST',
            body: formData,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },

        })
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

         });
  }

  componentDidMount() {

   return fetch('http://www.224tech.com/reactPhp/videolistJson.php')
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

  render() {

    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

    return (
      <View style={styless.container}>
        <TextInput
          style={styless.input}
          placeholder="Search Text..."
          onChangeText={(text) => this.setState({ contentSearch : text })}
        />
        <Button
          onPress={this.onPressButton}
          title="Search"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <ListView
          style={styless.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={stylesss.container}>
              <Video source={{ uri: `http://www.224tech.com/reactPhp/videos/${rowData.VideoPath}` }}
                resizeMode="cover"
                shouldPlay={false}
                style={stylesss.photo}
                />
              <Text style={stylesss.text}
                onPress={
                  this.GetVideoIDFunction.bind(
                this,rowData.VideoID,
                rowData.Title,
                rowData.Description,
                rowData.NumViews,
                rowData.VideoPath
              )}>
                {`Title:${rowData.Title} Views: ${rowData.NumViews}`}
              </Text>
            </View>
          }
          renderSeparator={this.ListViewItemSeparator}
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
          />

      </View>
    );
  }
}

class UploadVideo extends React.Component{
	 static navigationOptions= ({navigation}) =>({
    title: 'Upload Video',
  });

	constructor(props) {

   super(props)

   this.state = {

     TextInput_VideoTitle: '',
     TextInput_VideoDescription: '',
     TextInput_Video: '',

   }

 }
 _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,

      aspect : [4, 3],
    });

  console.log(pickerResult);

    this.setState({TextInput_Video : pickerResult.uri })
  };

 InsertPokemonRecordsToServer = () =>{

      let formData = new FormData();
      let uri = this.state.TextInput_Video;
      formData.append('videoTitle', this.state.TextInput_VideoTitle);
      formData.append('videoDescription', this.state.TextInput_VideoDescription);
      formData.append('video', {uri, name: `${uri}`, type: 'video/mp4',});
      //console.log(uri+'sss');
      fetch('http://www.224tech.com/reactPhp/insertVideoData.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },

      }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

            
          }).catch((error) => {
            console.error(error);
          });

}

 GoTo_Show_PokemonList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');

  }

 render() {
   return (

    <View style={styles.MainContainer}>

     <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Upload Video </Text>

     <TextInput
       placeholder="Video Title"
       onChangeText={ TextInputValue => this.setState({ TextInput_VideoTitle : TextInputValue }) }
       underlineColorAndroid='transparent'
       style={styles.TextInputStyleClass}
     />

    <TextInput
       placeholder="Video Description."
       onChangeText={ TextInputValue => this.setState({ TextInput_VideoDescription : TextInputValue }) }
       underlineColorAndroid='transparent'
       style={styles.TextInputStyleClass}
     />

    <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this._pickImage} >
      <Text style={styles.TextStyle}> SELECT VIDEOS </Text>
    </TouchableOpacity>

    <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertPokemonRecordsToServer} >
      <Text style={styles.TextStyle}> INSERT The Video TO SERVER </Text>
    </TouchableOpacity>

    </View>

   );
 }
}


const WatchManager = StackNavigator({
  userProfile: {screen: userProfile},
  VideoDetail: {screen: VideoDetail},
  WatchVideo: {screen: WatchVideo},

});

const UploadManager = StackNavigator({
  UploadVideo: {screen: UploadVideo},

});

const stylesss = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
  },
  photo: {
    height: 55,
    width: 55,
    borderRadius: 20,
  },
});

const styless = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

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

export default TabNavigator({
	VideoList: { screen: WatchManager },
  UploadVideo: { screen: UploadManager },
},
{

  	tabBarPosition: 'bottom',
  	swipeEnabled: false,

});

AppRegistry.registerComponent('userProfile', () => userProfile);
