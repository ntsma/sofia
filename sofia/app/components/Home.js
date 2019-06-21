/*Home.js*/

import React, { Component } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { Badge, Button, Body, Icon, Left, Right, Text} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

import NumberOfIssuesBadge from "./NumberOfIssuesBadge";
import ErrorNoInternetMessage from "./ErrorNoInternetMessage";

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      "isConnected": false,
      "refreshing": false,
      "answeredIssues": [],
      "submittedIssues": [],
      "draftIssues": [],
      "canceledIssues": [],
    }
  }

  _onRefresh = () => {
   this.setState({"refreshing": true});

   this.componentDidMount();

   this.setState({"refreshing": false});
 }

  /*Carregando questões enviadas, respondidas, canceladas e rascunhos*/
  componentDidMount() {

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

  /*Obtendo as questões rascunhos para a Sofia pelo Token*/
  async getDraftIssues() {
    console.log("AAA");
    const token = await AsyncStorage.getItem("token");

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/drafts', {
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

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/answered', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({"answeredIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  /*Obtendo as questões canceladas para a Sofia pelo Token*/
  async getCanceledIssues() {
    const token = await AsyncStorage.getItem("token");

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/rejects', {
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

    return fetch('http://plataforma.homolog.huufma.br/api/solicitant/sents', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.data.length);
      this.setState({"submittedIssues": responseJson.data});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    const answeredIssues = this.state.answeredIssues;
    const submittedIssues = this.state.submittedIssues;
    const canceledIssues = this.state.canceledIssues;
    const draftIssues = this.state.draftIssues;

    return (
      <View>
        <ErrorNoInternetMessage isConnected={this.state.isConnected} />

        <Button block success style={styles.button} onPress={() => {this.props.navigation.navigate("NewQuestion");}}>
          <Icon active type="MaterialIcons" name="question-answer" />
          <Text>Nova Pergunta</Text>
        </Button>

        <ScrollView
          refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
          <Button disabled={!this.state.isConnected} block light style={styles.button} onPress={() => {this.props.navigation.navigate("AnsweredIssues", {answeredIssues});}}>
            <Right>
              <Icon active type="MaterialIcons" name="call-received" />
            </Right>
            <Body>
              <Text>Respondidas</Text>
            </Body>
            <Right>
              <NumberOfIssuesBadge number={this.state.answeredIssues.length} isConnected={this.state.isConnected} />
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
              <Text>Canceladas</Text>
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
