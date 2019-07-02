import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  ActivityIndicator,
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
import Evaluation from "../components/Evaluation";

import AsyncStorage from '@react-native-community/async-storage';

export default class Overlay extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      "data": null,
      "status_description": "",
      "answer": "",
      "complement": "",
      "attributes": "",
      "permanent_education": "",
      "references": "",
      "sastifaction": 0,
      "attendance": 0,
      "showME": true
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

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/evaluate/' + this.props.navigation.state.params.item.id, {
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
        "data": responseJson.data,
        "status_description": responseJson.data.status_description,
        "answer": responseJson.data.answer,
        "complement": responseJson.data.complement,
        "attributes": responseJson.data.attributes,
        "permanent_education": responseJson.data.attributes,
        "references": responseJson.data.references,
        "showME": false
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
          {
            this.state.showME ?
              <Container style={styles.load}>
                <ActivityIndicator size="large" color="#3c8dbc"/>
              </Container>
              :
              <View style={styles.container}>
                <Text style={styles.text}>{this.state.status_description}</Text>
                <Text style={styles.header}>{this.props.navigation.state.params.item.description}</Text>
                <View style={styles.section}>
                  <Text style={styles.title}>Resposta</Text>
                  <Text style={styles.text}>{this.state.answer}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Complemento</Text>
                  <Text style={styles.text}>{this.state.complement}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Atributos</Text>
                  <Text style={styles.text}>{this.state.attributes}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Educação Permanente</Text>
                  <Text style={styles.text}>{this.state.permanent_education}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>Referências</Text>
                  <Text style={styles.text}>{this.state.references}</Text>
                </View>

                <View style={styles.section}>
                  <Evaluation navigation={this.props.navigation} data={this.state.data} />
                </View>
              </View>
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    margin: 10,
    padding: 5,
    backgroundColor: '#fafcfd'
  },
  section: {
    backgroundColor: '#edf5f9',
    padding: 5,
    marginBottom: 10
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    padding: 5,
    paddingBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
    }
});


/*
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

            <Evaluation />

          </Form>
          */

AppRegistry.registerComponent("Overlay", () => Overlay);
