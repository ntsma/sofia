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

import EvaluateButton from "./EvaluateButton";

export default class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "sastifaction": 0,
      "attendance": 0
    };
  }

  componentDidMount() {
    const evaluation_satisfaction_status_id = this.props.data.evaluation_satisfaction_status_id;
    const evaluation_attendance_status_id = this.props.data.evaluation_attendance_status_id;

    this.setState({
      "sastifaction": [31, 30, 29, 28, 27].indexOf(evaluation_satisfaction_status_id),
      "attendance": [34, 33, 32].indexOf(evaluation_attendance_status_id)

    })

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
          readonly={true}
          reviews={["Péssimo", "Ruim", "Regular", "Boa", "Ótima"]}
          defaultRating={this.state.attendance}
          size={20}
        />

      <Label>Grau de Atendimento</Label>
        <AirbnbRating
          count={3}
          reviews={["Não Atendeu", "Parcialmente", "Totalmente"]}
          defaultRating={this.state.attendance}
          size={20}
          onFinishRating={this.setAttendance.bind(this)}
        />

      <EvaluateButton buttonIsVisible={false} />
      </Card>
    );
  }
}
