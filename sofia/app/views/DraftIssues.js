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
    const draftQuestions = await AsyncStorage.getItem("draftQuestions");

    this.setState({
      "draftQuestions": JSON.parse(draftQuestions)
    });

    var v = (this.state.draftQuestions).concat(this.props.navigation.state.params.draftIssues);

    this.setState({
      "draftQuestions": v
    });

    console.log(this.state.draftQuestions);

  }

  render() {
    const draftIssues = this.state.draftQuestions;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunho"/>

        <FlatList
          data={draftIssues}
          keyExtractor={item => item.id.toString() + this.state.draftQuestions.length + 1}
          renderItem={({item}) => <DraftIssue navigation={this.props.navigation} question={item} />}
        />
      </Container>
    );
  }
}
