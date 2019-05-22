
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
  }

  async sair() {
    await AsyncStorage.setItem("email", "eduardo@gmail.com");
    await AsyncStorage.setItem("logging", "false");

    this.props.navigation.navigate("Login");

  }


  render() {
    return (
      <Container>
        <Header hasTabs androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Image style={{ width: 30, height: 30}} source={require("./logo.png")} />
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


        <Tabs>
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
                  this.props.navigation.navigate("QRCodeReader");
                }}
                >
                <Icon active type="MaterialIcons" name="call-received" />
                <Text>Respondidas</Text>
              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("QRCodeReader");
                }}
                >
                <Icon active type="MaterialIcons" name="call-made" />
                <Text>Enviadas</Text>
              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("QRCodeReader");
                }}
                >
                <Icon active type="MaterialIcons" name="cancel" />
                <Text>Canceladas</Text>
              </Button>

              <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
                onPress={() => {
                  this.props.navigation.navigate("QRCodeReader");
                }}
                >
                <Icon active type="MaterialIcons" name="drafts" />
                <Text>Rascunho</Text>
              </Button>

            </ScrollView>
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }} ><Text>Palestras</Text></TabHeading>}>

            <ScrollView>
              <Post />

              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("./heart.png")} />
                    <Body>
                      <Text>Patrino</Text>
                      <Text note>Equipe de Comunicação</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Image source={require("./2.jpg")} style={{height: 200, width: 200, flex: 1}}/>
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
                    <Thumbnail source={require("./heart.png")} />
                    <Body>
                      <Text>Patrino</Text>
                      <Text note>Equipe de Comunicação</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Image source={require("./3.jpg")} style={{height: 200, width: 200, flex: 1}}/>
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
            <ScrollView>
              <FAQ />
            </ScrollView>
          </Tab>

        </Tabs>

      </Container>
    );
  }

}

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
