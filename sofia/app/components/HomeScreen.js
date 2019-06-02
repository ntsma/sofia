
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

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";


import {
  Avatar,
  Badge,
  Button,
  Header,
  ThemeProvider,
  Text,

} from "react-native-elements";

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions, Picker} from 'react-native';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx;
}

import Post from "./Post.js";
import FAQ from "./FAQ.js";

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#3c8dbc",
      elevation: null
    },
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
        "numberOfAnsweredIssues": 0,
        "numberOfSubmittedIssues": 0,
        "numberOfDraftIssues": 0,
        "numberOfCanceledIssues": 0,
        "selectedTab": "home"
    }
  }

  componentDidMount() {
      this.getCanceledIssues();
      this.getDraftIssues();
      this.getAnsweredIssues();
      this.getSubmittedIssues();

  }

  async sair() {

    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("logging", "false");

    this.props.navigation.navigate("Login");

  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getDraftIssues() {
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

      this.setState({"numberOfDraftIssues": responseJson.data.data.length});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getAnsweredIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/answered', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES RESPONDIDAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"numberOfAnsweredIssues": responseJson.data.data.length});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getCanceledIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/rejects', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES CANCELADAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"numberOfCanceledIssues": responseJson.data.data.length});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getSubmittedIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/sents', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES ENVIADAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"numberOfSubmittedIssues": responseJson.data.data.length});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    return (
      <ThemeProvider>
        <View>
          <Header
            statusBarProps={{ barStyle: 'light-content', backgroundColor: '#3D6DCC' }}
            barStyleP="light-content"
            leftComponent={{ icon: 'menu', color: '#fff' }}
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


        </View>


        <TabNavigator>
            <TabNavigator.Item
              title="Início"
              selected={this.state.selectedTab === 'home'}
              onPress={() => this.setState({selectedTab: 'home'})}
              renderIcon={() => <Icon name="home" />}
              renderSelectedIcon={() => <Icon name="home" />}
              selectedTitleStyle={{color: "#3496f0"}}
            >
            <View>
              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("NewQuestion");
                  }}
                  icon={
                    <Icon
                      name="arrow-right"
                      size={15}
                      color="white"
                    />
                  }
                  title="  Nova Pergunta"
                />
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("AnsweredIssues");
                  }}
                  icon={
                    <Icon
                      name="send"
                      size={15}
                      color="white"
                    />
                  }
                  title=" Respondidas"
                />
                <Badge
                  value={ this.state.numberOfAnsweredIssues }
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("SubmittedIssues");
                  }}
                  icon={
                    <Icon
                      name="send"
                      size={15}
                      color="white"
                    />
                  }
                  title=" Enviadas"
                />
                <Badge
                  value={ this.state.numberOfSubmittedIssues }
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("SubmittedIssues");
                  }}
                  icon={
                    <Icon
                      name="send"
                      size={15}
                      color="white"
                    />
                  }
                  title=" Canceladas"
                />
                <Badge
                  value={this.state.numberOfCanceledIssues}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>

              <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("SubmittedIssues");
                  }}
                  icon={
                    <Icon
                      name="send"
                      size={15}
                      color="white"
                    />
                  }
                  title=" Rascunho"
                />
                <Badge
                  value={this.state.numberOfDraftIssues}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>

            </View>
            </TabNavigator.Item>

            <TabNavigator.Item
              title="Testes"
              selected={this.state.selectedTab === 'profile'}
              onPress={() => this.setState({selectedTab: 'profile'})}
              renderIcon={() => <Icon name="user" />}
              renderSelectedIcon={() => <Icon name="user" />}
              selectedTitleStyle={{color: "#3496f0"}}
            >
              <Post />
            </TabNavigator.Item>
          </TabNavigator>

      </ThemeProvider>
    );
  }

}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
