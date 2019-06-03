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

    console.debug("DENTRO DE QUESTION");
    console.debug(question);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", 'send');
    formdata.append("description", question)

    console.debug(formdata);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/handle', {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + token
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug("RESPOSTA");
        console.debug(responseJson);

        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error(error);
      });

  }


  async onCreateDraftQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    console.debug("DENTRO DE QUESTION");
    console.debug(question);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", 'draft');
    formdata.append("description", question)

    console.debug(formdata);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/handle', {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + token
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug("RESPOSTA");
        console.debug(responseJson);

        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8dbc" style={styles.header}>
          <Left>
            <Image style={styles.image} source={require("../resources/logo.png")} />
          </Left>
          <Body>
            <Title>Sofia</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content>

          <Form style={styles.container}>
            <View style={styles.title}>
              <Label style={styles.textTitle}>Descreva sua pergunta</Label>
            </View>
            <Textarea style={styles.textArea} rowSpan={10} onChangeText={(question) => this.setState({question})} placeholder="Sua pergunta..." placeholderTextColor="#ccc" bordered />
              <Button block success style={styles.button} onPress={this.onCreateQuestion.bind(this)}>
                <Text>Enviar Pergunta</Text>
              </Button>
              <Button block light style={styles.button} onPress={this.onCreateDraftQuestion.bind(this)}>
                <Text>Salvar como rascunho</Text>
              </Button>
          </Form>

         </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3c8dbc",
  },
  image: {
    width: 40,
    height: 40
  },
  button: {
    width: '80%',
    height: 60,
    marginTop: 20,
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10
  },
  textTitle: {
    fontSize: 20
  },
  textArea: {
    width: '95%',
    backgroundColor: '#f6f6f6'
  }
});


AppRegistry.registerComponent("NewQuestion", () => NewQuestion);
