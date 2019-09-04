/*RelatedIssueView.js*/

import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View

} from "react-native";

import {
  Container,
  Content,
  Header,
  Item,
  Input, 
  Text,
  Title,
  
} from "native-base";

import BackHeader from "../components/BackHeader";
import Evaluation from "../components/Evaluation";

import AsyncStorage from '@react-native-community/async-storage';

export default class RelatedIssueView extends Component {
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
    this.getRelatedIssue();
  }
  
  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getRelatedIssue() {
    const token = await AsyncStorage.getItem("token");
    
    return fetch('http://sofia.huufma.br/api/answer/read/' + this.props.navigation.state.params.item.id, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("RETURNING...");
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
        <BackHeader navigation={this.props.navigation} name="Pergunta relacionada" />
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
                  <Evaluation navigation={this.props.navigation} data={this.state.data} judgeType="0" />
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
