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

import AsyncStorage from '@react-native-community/async-storage';

export default class EvaluateButton extends Component {

  judgeNormal(token, sastifaction, attendance) {
    let formdata = new FormData();

    formdata.append("satisfaction", sastifaction);
    formdata.append("attendance", attendance);
    formdata.append("avoided_forwarding", false);
    formdata.append("induced_forwarding", false);
    formdata.append("observation", "");

    console.log(this.props.data);
    console.debug(formdata);

    return fetch('http://sofia.huufma.br/api/solicitation/evaluate/' + this.props.data.solicitation_id, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Avaliação de questão respondida");
      console.debug(responseJson);

      shouldUpdate = true;
      this.props.navigation.navigate("HomeScreen", {shouldUpdate});

    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  judgeRelatedIssue(token, sastifaction, attendance) {
    let formdata = new FormData();

    formdata.append("sats", sastifaction);
    formdata.append("att", attendance);
    formdata.append("avoided_forwarding", false);
    formdata.append("induced_forwarding", false);
    formdata.append("observation", "");
    formdata.append("answer_id", this.props.data.answer_id);

    console.log("RUBEM");
    console.log(this.props.data);
    console.debug(formdata);

    return fetch('http://sofia.huufma.br/api/solicitation/bysearch/evaluate', {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
    .then((response) => response.text())
    .then((responseJson) => {
      console.log("Avaliação de questão relacionada");
      console.debug(responseJson);

      shouldUpdate = true;
      this.props.navigation.navigate("HomeScreen", {shouldUpdate});

    })
    .catch((error) => {
      console.error(error);
    });
  }

  async judge() {
    const sastifaction = this.props.sastifaction;
    const attendance = this.props.attendance;

    const token = await AsyncStorage.getItem("token");

    if(this.props.judgeType == "1") {
      this.judgeNormal(token, sastifaction, attendance);

    } else {
      this.judgeRelatedIssue(token, sastifaction, attendance);
      this.props.onClose();
    }

  }

  render() {
    if(this.props.buttonIsVisible) {
      return (
        <Button block success style={{ marginLeft: 30, marginRight: 30, marginTop: 30}}
          onPress={() => {
            this.judge();
          }}
          >
          <Text>Avaliar</Text>
        </Button>
      );

    } else {
      return(
        <Text></Text>
      );
    }

  }
}
