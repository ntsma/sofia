/*NewQuestion.js*/

import React, { Component } from "react";

import {Platform, Alert} from "react-native";

import {
  Image,
  TextInput,
  StyleSheet,
  View,
  Modal
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

import BackHeader from "../components/BackHeader";

export default class TeleconsultoriaRealizada extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Parabéns!"/>

        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   Sua pergunta já foi enviada aos nossos teleconsultores. 
                   Em até 72 horas lhe daremos uma resposta. 
                   Fique atento ao aplicativo!
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Button info>
            <Text>Tem outra dúvida? Faça uma nova pesquisa</Text>
          </Button>

          <Button info>
            <Text>Retornar ao menu principal</Text>
          </Button>

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

  attachButton: {
    width: '90%',
    color: "yellow",
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
