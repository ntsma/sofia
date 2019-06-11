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

export default class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "sastifaction": 0,
      "attendance": 0
    };
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

  render() {
    return (
      <Card title="Avaliação">
        <Label>Grau de Satisfação</Label>
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
    );
  }
}
