
import React, { Component } from "react";

import {
  Alert,
  AppRegistry,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  Badge,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
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

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

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
      <Container>
        <Header hasTabs androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Image style={{ width: 30, height: 30}} source={require("../resources/logo.png")} />
          </Left>
          <Body>
            <Title>Sofia</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.sair.bind(this)}
            >
              <Icon type="MaterialIcons" name="exit-to-app" />
            </Button>
          </Right>
        </Header>


        <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null}>
          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }}><Text>Perguntas</Text></TabHeading>}>
            <Button block success style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
              onPress={() => {

                this.props.navigation.navigate("NewQuestion");
              }}
              >
              <Icon active type="MaterialIcons" name="question-answer" />
              <Text>Nova Pergunta</Text>
            </Button>

            <ScrollView>
              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("AnsweredIssues");
                }}
                >
                <Icon active type="MaterialIcons" name="call-received" />
                <Text>Respondidas</Text>

                <Badge>
                    <Text>{ this.state.numberOfAnsweredIssues }</Text>
                </Badge>
              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("SubmittedIssues");
                }}
                >
                <Icon active type="MaterialIcons" name="call-made" />

                <Text>
                    Enviadas
                </Text>

                <Badge>
                    <Text>{ this.state.numberOfSubmittedIssues }</Text>
                </Badge>

              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("CanceledIssues");
                }}
                >
                <Icon active type="MaterialIcons" name="cancel" />
                <Text>Canceladas</Text>

                <Badge>
                    <Text>{ this.state.numberOfCanceledIssues }</Text>
                </Badge>
              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("DraftIssues");
                }}
                >
                <Icon active type="MaterialIcons" name="drafts" />
                <Text>Rascunho</Text>

                <Badge>
                    <Text>{ this.state.numberOfDraftIssues }</Text>
                </Badge>
              </Button>

            </ScrollView>
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }} ><Text>Notícias</Text></TabHeading>}>

            <ScrollView>
              <Post />

              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("../resources/heart.png")} />
                    <Body>
                      <Text>Patrino</Text>
                      <Text note>Equipe de Comunicação</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Image source={require("../resources/2.jpg")} style={{height: 200, width: 200, flex: 1}}/>
                </CardItem>

                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active type="MaterialIcons" name="search" />
                      <Text>Visualizar</Text>
                    </Button>
                  </Left>

                  <Right>
                    <Text>11h ago</Text>
                  </Right>
                </CardItem>
              </Card>


              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("../resources/heart.png")} />
                    <Body>
                      <Text>Patrino</Text>
                      <Text note>Equipe de Comunicação</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Image source={require("../resources/3.jpg")} style={{height: 200, width: 200, flex: 1}}/>
                </CardItem>

                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active type="MaterialIcons" name="search" />
                      <Text>Visualizar</Text>
                    </Button>
                  </Left>

                  <Right>
                    <Text>11h ago</Text>
                  </Right>
                </CardItem>
              </Card>


            </ScrollView>

          </Tab>


          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }}><Text>FAQ</Text></TabHeading>}>
            <FAQ navigation={this.props.navigation}/>
          </Tab>

        </Tabs>

      </Container>
    );
  }

}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
