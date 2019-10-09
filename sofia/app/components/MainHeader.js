/*MainHeader.js*/

import React, { Component } from "react";

import {
  Image,
  BackHandler,
  StatusBar,
  Platform,
} from "react-native";

import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import RNExitApp from 'react-native-exit-app';

export default class MainHeader extends Component {
  /*Saindo do app*/
  async logout() {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("logging", "false");

    if(Platform.OS == 'ios'){
      RNExitApp.exitApp();
    }else{
      BackHandler.exitApp();
    } 
    
    return true;
  }

  render() {
    return (
      <Header hasTabs androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
      <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />
        <Left>
          <Image style={{ width: 30, height: 30, marginLeft: 10}} source={require("../resources/logo.png")} />
        </Left>
        <Body>
          <Title style={{ color: '#FFF' }}>Sofia</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={this.logout.bind(this)}
          >
            <Icon style={{ color: '#FFF', fontSize: 24, }} type="MaterialIcons" name="exit-to-app" />
          </Button>
        </Right>
      </Header>
    );
  }

}
