
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

export default class SubmittedIssues extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.getSubmittedIssues();
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
      console.debug(responseJson.success.data);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("HomeScreen") }
            >
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Voltar</Title>
          </Body>
          <Right>

          </Right>
        </Header>

        <ScrollView>
          <Card>
            <CardItem cardBody>
              <Text>Quais são os procedimentos para evitar a contaminação de itens após o uso de medicamentos exagerados.</Text>
            </CardItem>

            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active type="MaterialIcons" name="search" />
                  <Text>Visualizar</Text>
                </Button>
              </Left>

              <Right>
                <Text>11h atrás</Text>
              </Right>
            </CardItem>
          </Card>
        </ScrollView>

      </Container>
    );
  }

}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
