/*DraftIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container } from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import DraftIssue from "../components/DraftIssue";
import BackHeader from "../components/BackHeader";

export default class DraftIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      "draftIssues": []
    };

  }

  componentDidMount() {
    this.a();
  }

  async a() {
    var draftQuestions = await AsyncStorage.getItem("draftQuestions");

    if(draftQuestions == null) {
      draftQuestions = "[]";
    }

    this.setState({
      "draftIssues": JSON.parse(draftQuestions)
    });

    var v = this.state.draftIssues.concat(this.props.navigation.state.params.draftIssues);

    this.setState({
      "draftIssues": v
    });

    console.log(this.state.draftIssues);

  }

  render() {
    const draftIssues = this.state.draftIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunho"/>

        <FlatList
          data={draftIssues}
          keyExtractor={item => item.id.toString() + this.state.draftIssues.length + 1}
          renderItem={({item}) => <DraftIssue navigation={this.props.navigation} question={item} />}
        />
      </Container>
    );
  }
}
