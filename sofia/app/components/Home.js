/*Home.js*/

import React, { Component } from "react";
import {Alert, ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import {Badge, Button, Body, Icon, Left, Right, Text} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

import NumberOfIssuesBadge from "./NumberOfIssuesBadge";
import ErrorNoInternetMessage from "./ErrorNoInternetMessage";

import {get} from "../controllers/Issues.js";

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      "shouldEmpty": false,
      "isConnected": false,
      "refreshing": false,
      "answeredIssues": [],
      "submittedIssues": [],
      "draftIssues": [],
      "canceledIssues": [],
      "waitingEvaluate": false
    }
  }

  unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);

    this.setState({
      isConnected: state.isConnected
    })
  });

  _onRefresh = () => {
   this.setState({"refreshing": true});

   this.componentDidMount();
   this.onSendDraftIssues();

   if(this.state.shouldEmpty == true) {
     this.onEmptyDraftIssues();
   }

   this.setState({"refreshing": false});
 }

 /*Esvaziando listas de rascunhos enviados offline*/
 async onEmptyDraftIssues() {
   await AsyncStorage.setItem("draftQuestions", JSON.stringify([]));

   this.setState({
     "shouldEmpty": false
   });

 }

  /*Carregando questões enviadas, respondidas, canceladas e rascunhos*/

  componentDidMount() {
    this.b();
  }

  async onSendDraftIssues() {
    var token = await AsyncStorage.getItem("token");
    var draftQuestions = await AsyncStorage.getItem("draftQuestions");

    draftQuestions = JSON.parse(draftQuestions);

    console.log(draftQuestions);

    NetInfo.fetch().then(state => {
      if(state.isConnected && draftQuestions != null) {

        for(index in draftQuestions) {
          console.log("Entrou");

          let formdata = new FormData();

          formdata.append("type_id", 52);
          formdata.append("mode", 'send');
          formdata.append("description", draftQuestions[index].description);
          formdata.append("mobile", 1);
          formdata.append("file_ids", draftQuestions[index].file_ids);

          console.log(formdata);

          return fetch('http://sofia.huufma.br/api/solicitation/handle', {
              method: 'POST',
              headers: {
                Authorization: "Bearer " + token
              },
              body: formdata,
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                "shouldEmpty": true
              });

              console.log("Enviado com sucesso!");
              Alert.alert("Solicitação enviada com succeso!");

            })
            .catch((error) => {
              console.error(error);
            });

        }
      }
    });
  }


  b() {
    console.log(this.state);

    NetInfo.fetch().then(state => {
      console.log(state.isConnected);

      this.setState({
        "isConnected": state.isConnected
      });

      this.getCanceledIssues();
      this.getDraftIssues();
      this.getAnsweredIssues();
      this.getSubmittedIssues();
    });

  }

  componentWillUnmount() {
    this.state = {
      "isConnected": false,
      "refreshing": false,
      "answeredIssues": [],
      "submittedIssues": [],
      "draftIssues": [],
      "canceledIssues": [],
      "waitingEvaluate": false
    }
  }

  /*Obtendo as questões rascunhos para a Sofia pelo Token*/
  async getDraftIssues() {
    const token = await AsyncStorage.getItem("token");

    return fetch('http://sofia.huufma.br/api/solicitant/drafts', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({"draftIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões respondidas para a Sofia pelo Token*/
  async getAnsweredIssues() {
    const token = await AsyncStorage.getItem("token");

    console.log("CELULAR");
    console.log(get(token.toString()));

    return fetch('http://sofia.huufma.br/api/solicitant/answered', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var answeredIssues = responseJson.data;

      this.setState({
        "waitingEvaluate": false
      });

      var special = [];

      for(index in answeredIssues) {
        if(answeredIssues[index].status_id == 21) {
          this.setState({
            "waitingEvaluate": true
          });

          special.push(answeredIssues[index]);
          answeredIssues.splice(index, 1);

        }
      }

      this.setState({"answeredIssues": special.concat(answeredIssues)});

    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões canceladas para a Sofia pelo Token*/
  async getCanceledIssues() {
    const token = await AsyncStorage.getItem("token");

    return fetch('http://sofia.huufma.br/api/solicitant/rejects', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({"canceledIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getSubmittedIssues() {
    const token = await AsyncStorage.getItem("token");

    return fetch('http://sofia.huufma.br/api/solicitant/sents', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({"submittedIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  onNavigateNewIssue() {
    /*if(this.state.waitingEvaluate) {
      Alert.alert("Primeiro leia todas as questões respondidas!");
    } else {
      this.props.navigation.navigate("NewQuestion");

    }*/

    const isConnected = this.state.isConnected;

    console.log(isConnected)

    this.props.navigation.navigate("NewQuestion", {isConnected});

  }

  atu() {
    try {
      if(this.props.navigation.state.params.shouldUpdate) {
        if(this.props.navigation.state.params.shouldUpdate == true) {
          this.b();

          this.props.navigation.state.params.shouldUpdate = false;
        }
      }
    } catch(e) {

    }
  }

  render() {

    this.atu();

    const answeredIssues = this.state.answeredIssues;
    const submittedIssues = this.state.submittedIssues;
    const canceledIssues = this.state.canceledIssues;
    const draftIssues = this.state.draftIssues;
    const estado = this.state;
    return (
      <View>
        <ErrorNoInternetMessage isConnected={this.state.isConnected} />

        <Button block success style={styles.button} onPress={() => this.onNavigateNewIssue()}>
          <Icon active type="MaterialIcons" name="question-answer" />
          <Text>Como posso te ajudar?</Text>
        </Button>

        <ScrollView
          refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
          <Button disabled={!this.state.isConnected} block light style={styles.button} onPress={() => {this.props.navigation.navigate("AnsweredIssues", {answeredIssues, estado});}}>
            <Right>
              <Icon active type="MaterialIcons" name="call-received" />
            </Right>
            <Body>
              <Text>Respondidas</Text>
            </Body>
            <Right>
              <NumberOfIssuesBadge number={this.state.answeredIssues.length} isConnected={this.state.isConnected} waitingEvaluate={this.state.waitingEvaluate}/>
            </Right>
          </Button>

          <Button disabled={!this.state.isConnected} block light style={styles.button} onPress={() => {this.props.navigation.navigate("SubmittedIssues", {submittedIssues});}}>
            <Right>
              <Icon active type="MaterialIcons" name="call-made" />
            </Right>
            <Body>
              <Text>Enviadas</Text>
            </Body>
            <Right>
              <NumberOfIssuesBadge number={this.state.submittedIssues.length} isConnected={this.state.isConnected} />

            </Right>
          </Button>

          <Button disabled={!this.state.isConnected} block light style={styles.button} onPress={() => {this.props.navigation.navigate("CanceledIssues", {canceledIssues});}}>
            <Right>
              <Icon active type="MaterialIcons" name="cancel" />
            </Right>
            <Body>
              <Text>Devolvidas</Text>
            </Body>
            <Right>
              <NumberOfIssuesBadge number={this.state.canceledIssues.length} isConnected={this.state.isConnected} />
            </Right>
          </Button>

          <Button disabled={!this.state.isConnected} block light style={styles.button} onPress={() => {this.props.navigation.navigate("DraftIssues", {draftIssues});}}>
            <Right>
              <Icon active type="MaterialIcons" name="drafts" />
            </Right>
            <Body>
              <Text>Rascunho</Text>
            </Body>
            <Right>
              <NumberOfIssuesBadge number={this.state.draftIssues.length} isConnected={this.state.isConnected} />
            </Right>
          </Button>
          <View style={{height: 3}}>
          </View>
        </ScrollView>
      </View>
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
    height: 70,
    marginTop: 20,
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
    width: '95%',
    backgroundColor: '#f6f6f6'
  }
});
