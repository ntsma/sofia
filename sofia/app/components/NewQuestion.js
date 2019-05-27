import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  View
} from "react-native";

import {
  Badge,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Textarea,
  Title,
  Thumbnail
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      question: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  async onCreateQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/handle', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Authorization: Bearer + " " + token,
          type_id: 52,
          mode: "send",
          description: question
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.props.navigation.navigate("HomeScreen");
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
            <Image style={{ width: 30, height: 30}} source={require("./logo.png")} />
          </Left>
          <Body>
            <Title>Sofia</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
              <Label style={{ fontSize: 20 }}>Descreva sua pergunta</Label>
            </View>

            <Textarea onChangeText={(question) => this.setState({question})} style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").width}} rowSpan={5} bordered />

            <Button block success style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30}}
              onPress={this.onCreateQuestion.bind(this)}
              >
              <Text>Criar</Text>
            </Button>
          </Form>
         </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent("NewQuestion", () => NewQuestion);
