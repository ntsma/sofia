/*Home.js*/

import React, { Component } from "react";

import {
  ScrollView,
  View
} from "react-native";

import {
  Badge,
  Button,
  Icon,
  Text,
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
        "answeredIssues": [],
        "submittedIssues": [],
        "draftIssues": [],
        "canceledIssues": [],
    }

  }

  /*Carregando questões enviadas, respondidas, canceladas e rascunhos*/
  componentDidMount() {
      this.getCanceledIssues();
      this.getDraftIssues();
      this.getAnsweredIssues();
      this.getSubmittedIssues();

  }

  /*Obtendo as questões rascunhos para a Sofia pelo Token*/
  async getDraftIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/drafts', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES RASCUNHOS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"draftIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões respondidas para a Sofia pelo Token*/
  async getAnsweredIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/answered', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES RESPONDIDAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"answeredIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões canceladas para a Sofia pelo Token*/
  async getCanceledIssues() {
    const token = await AsyncStorage.getItem("token");

    console.debug("OBTENDO O TOKEN DE ACESSO...");
    console.debug("TOKEN: " + token);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/rejects', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES CANCELADAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"canceledIssues": responseJson.data});
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

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/sents', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.debug("OBTENDO QUESTÕES ENVIADAS...");
      console.debug("QUESTÕES");
      console.debug(responseJson.data.data);

      this.setState({"submittedIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    const answeredIssues = this.state.answeredIssues.data;
    const submittedIssues = this.state.submittedIssues.data;
    const canceledIssues = this.state.canceledIssues.data;
    const draftIssues = this.state.draftIssues.data;

    return (
      <View>
        <Button block success style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
          onPress={() => {

            this.props.navigation.navigate("NewQuestion");
          }}
          >
          <Icon active type="MaterialIcons" name="question-answer" />
          <Text>Nova Pergunta</Text>
        </Button>

        <ScrollView>
          <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
            onPress={() => {
              this.props.navigation.navigate("AnsweredIssues", {answeredIssues});
            }}
            >
            <Icon active type="MaterialIcons" name="call-received" />
            <Text>Respondidas</Text>

            <Badge>
                <Text>{ this.state.answeredIssues.total }</Text>
            </Badge>
          </Button>

          <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
            onPress={() => {
              this.props.navigation.navigate("SubmittedIssues", {submittedIssues});
            }}
            >
            <Icon active type="MaterialIcons" name="call-made" />

            <Text>
                Enviadas
            </Text>

            <Badge>
                <Text>{ this.state.submittedIssues.total }</Text>
            </Badge>

          </Button>

          <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
            onPress={() => {
              this.props.navigation.navigate("CanceledIssues", {canceledIssues});
            }}
            >
            <Icon active type="MaterialIcons" name="cancel" />
            <Text>Canceladas</Text>

            <Badge>
                <Text>{ this.state.canceledIssues.total }</Text>
            </Badge>
          </Button>

          <Button block light style={{ marginTop: 15, marginBottom: 5, marginLeft: 30, marginRight: 30, paddingBottom: 38, paddingTop: 38}}
            onPress={() => {
              this.props.navigation.navigate("DraftIssues", {draftIssues});
            }}
            >
            <Icon active type="MaterialIcons" name="drafts" />
            <Text>Rascunho</Text>

            <Badge>
                <Text>{ this.state.draftIssues.total }</Text>
            </Badge>
          </Button>

        </ScrollView>
      </View>
    );
  }

}
