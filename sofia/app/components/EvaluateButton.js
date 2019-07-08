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

  async judge() {
    const sastifaction = this.props.sastifaction;
    const attendance = this.props.attendance;

    const token = await AsyncStorage.getItem("token");

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
      console.log("EEEEEE");
      console.debug(responseJson);

      shouldUpdate = true;
      this.props.navigation.navigate("HomeScreen", {shouldUpdate});

    })
    .catch((error) => {
      console.error(error);
    });

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
