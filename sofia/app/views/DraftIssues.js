/*DraftIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

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

  async componentDidMount() {
    const draftQuestions = await AsyncStorage.getItem("draftQuestions");

    this.setState({
      "draftQuestions": draftQuestions
    });

    console.log(this.state.draftQuestions);
  }

  render() {
    const answeredIssues = this.props.navigation.state.params.draftIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunho" />

        <FlatList
          data={this.state.draftQuestions}
          keyExtractor={item => item.question.toString()}
          renderItem={({item}) => <DraftIssue navigation={this.props.navigation} question={item} />}
        />

        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <DraftIssue navigation={this.props.navigation} question={item} />}
        />

      </Container>
    );
  }

}
