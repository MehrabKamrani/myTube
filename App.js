import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { StackNavigator } from 'react-navigation';

import Login from './screen/login';
import SignUP from './screen/signUp';
import Activation from './screen/activation';
import UserProfile from './screen/userProfile';
//import AdminProfile from './screen/adminProfile';

const ScreenManager = StackNavigator({
  Login: {screen: Login},
  SignUP: {screen: SignUP},
  Activation: {screen: Activation},
  UserProfile: {screen: UserProfile},
//  AdminProfile: {screen: AdminProfile}
});

export default ScreenManager;
