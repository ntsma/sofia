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

import {
    Rating,
    AirbnbRating,
    Card

} from 'react-native-elements';

import BackHeader from "../components/BackHeader";
import AsyncStorage from '@react-native-community/async-storage';

export default class Overlay extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      "answer": "",
      "complement": "",
      "attributes": "",
      "permanent_education": "",
      "references": "",
      "sastifaction": 0,
      "attendance": 0
    };
  }

  componentDidMount() {
    this.getSubmittedIssues();
  }

  setSatifaction(text) {
    const array = [31, 30, 29, 28, 27];
    const sastifaction = array[text - 1];

    this.setState({
      "sastifaction": sastifaction
    });
  }

  setAttendance(text) {
    const array = [34, 33, 32];
    const attendance = array[text - 1];

    this.setState({
      "attendance": attendance
    });
  }

  async judge() {
    const sastifaction = this.state.sastifaction;
    const attendance = this.state.attendance;

    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    let formdata = new FormData();

    formdata.append("satisfaction", sastifaction);
    formdata.append("attendance", attendance);
    formdata.append("avoided_forwarding", false);
    formdata.append("induced_forwarding", false);
    formdata.append("observation", "");

    console.debug(formdata);

    return fetch('http://plataforma.homolog.huufma.br//api/solicitation/evaluate/' + this.props.navigation.state.params.item.id, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
    .then((response) => response.json())
    .then((responseJson) => {

      console.debug(responseJson);

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

    return fetch('http://plataforma.homolog.huufma.br/api/answer/read/' + this.props.navigation.state.params.item.id, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO RESPOSTA...");
      console.debug("RESPOSTA");
      console.debug(responseJson);

      this.setState({
        "answer": responseJson.data.answer,
        "complement": responseJson.data.complement,
        "attributes": responseJson.data.attributes,
        "permanent_education": responseJson.data.attributes,
        "references": responseJson.data.references
      });
    })
    .catch((error) => {
      console.error(error);
    });

  }


  render() {
    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Respondidas" />
        <Content>
          <Form>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
              <Label style={{ fontSize: 20 }}>{this.props.navigation.state.params.item.description}</Label>
            </View>

            <Card title="Resposta">
              <Text>{this.state.answer}</Text>
            </Card>

            <Card title="Complemento">
              <Text>{this.state.complement}</Text>
            </Card>

            <Card title="Atributos">
              <Text>{this.state.attributes}</Text>
            </Card>

            <Card title="Educação Permanente">
              <Text>{this.state.permanent_education}</Text>
            </Card>

            <Card title="Referências">
              <Text>{this.state.references}</Text>
            </Card>

            <Card title="Avaliação">
              <Label>Grau de Sastifação</Label>
              <AirbnbRating
                count={5}
                reviews={["Péssimo", "Ruim", "Regular", "Boa", "Ótima"]}
                defaultRating={5}
                size={20}
                onFinishRating={this.setSatifaction.bind(this)}
              />

            <Label>Grau de Atendimento</Label>
              <AirbnbRating
                count={3}
                reviews={["Não Atendeu", "Parcialmente", "Totalmente"]}
                defaultRating={3}
                size={20}
                onFinishRating={this.setAttendance.bind(this)}
              />

            <Button block success style={{ marginLeft: 30, marginRight: 30, marginTop: 30}}
                onPress={() => {
                  this.judge();
                }}
                >
                <Text>Avaliar</Text>
              </Button>
            </Card>

          </Form>
         </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent("Overlay", () => Overlay);
