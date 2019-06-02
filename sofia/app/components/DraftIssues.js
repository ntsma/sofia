
import React, { Component } from "react";

import {
  Alert,
  AppRegistry,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Title,
  Thumbnail
} from "native-base";


import {
  ThemeProvider,
  Header,
  Avatar,
  Badge
} from "react-native-elements";

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

import Issue from "./Issue";

export default class DraftIssues extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      "data": []
    };
  }

  componentDidMount() {
    this.getSubmittedIssues();
  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getSubmittedIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/drafts', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES RASCUNHOS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"data": responseJson.data.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    return (
      <ThemeProvider>
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#3D6DCC' }}
          barStyleP="light-content"
          leftComponent={{ icon: 'arrow-back', color: '#fff' }}
          centerComponent={{ text: 'Sofia', style: { color: '#fff' } }}
          rightComponent={<View>
                            <Avatar
                              rounded
                              source={require('./logo.png')}
                            />
                            <Badge
                              status="success"
                              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            />
                          </View>
                        }
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
          }}
        />

        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Issue navigation={this.props.navigation} question={item}/>}
        />

    </ThemeProvider>
    );
  }

}
