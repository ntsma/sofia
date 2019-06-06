/*AnsweredIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

import AnsweredIssue from "./AnsweredIssue";
import BackHeader from "./BackHeader";

export default class AnsweredIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const answeredIssues = this.props.navigation.state.params.answeredIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Respondidas" />

        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <AnsweredIssue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
