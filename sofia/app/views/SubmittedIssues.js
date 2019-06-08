/*SubmittedIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

import SubmittedIssue from "../components/SubmittedIssue";
import BackHeader from "../components/BackHeader";

export default class SubmittedIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const submittedIssues = this.props.navigation.state.params.submittedIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Enviados" />

        <FlatList
          data={submittedIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <SubmittedIssue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
