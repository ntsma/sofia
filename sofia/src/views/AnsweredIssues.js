/*AnsweredIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Button, Text } from "native-base";

import AnsweredIssue from "../components/AnsweredIssue";

export default class AnsweredIssues extends Component {
  componentDidMount() {
    console.log(this.props.navigation.state.params.estado);

    this.props.navigation.state.params.estado.isConnected;
  }

  update() {
    shouldUpdate = true;
    this.props.navigation.navigate("HomeScreen", { shouldUpdate });
  }

  render() {
    const answeredIssues = this.props.navigation.state.params.answeredIssues;

    return (
      <Container>
        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <AnsweredIssue navigation={this.props.navigation} question={item} />
          )}
        />
      </Container>
    );
  }
}
