/*EditQuestion.js*/

import React, { Component } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View
} from "react-native";

import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  Icon,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Title,
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import BackHeader from "../components/BackHeader";

export default class EditQuestion extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      question: ""
    };
  }

  componentDidMount() {
    this.setState({
      "question": this.props.navigation.state.params.item.description
    });
  }

  async onCreateQuestion() {
    const item = this.props.navigation.state.params.item;
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    console.debug("DENTRO DE QUESTION");
    console.debug(question);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", 'send');
    formdata.append("description", question);

    console.debug(formdata);

    return fetch('http://sofia.huufma.br/api/solicitation/' + item.id, {
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
    const item = this.props.navigation.state.params.item;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Atualizar Pergunta"/>

        <Content>

          <Form style={styles.container}>
            <View style={styles.title}>
              <Label style={styles.textTitle}>Descreva sua pergunta</Label>
            </View>
            <Textarea value={this.state.question} style={styles.textArea} rowSpan={10} onChangeText={(question) => this.setState({question})} placeholder="Sua pergunta..." placeholderTextColor="#ccc" bordered />
              <Button block success style={styles.button} onPress={this.onCreateQuestion.bind(this)}>
                <Text>Atualizar</Text>
                <Icon type="MaterialIcons" name="file-upload"/>
              </Button>
              <View style={{height: 3}}>
              </View>
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
    width: '90%',
    height: 60,
    marginTop: 10,
    marginLeft: '5%',
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
    width: '90%',
    backgroundColor: '#f6f6f6'
  }
});