/*SubmittedIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container } from "native-base";

import SubmittedIssue from "../components/SubmittedIssue";

export default class SubmittedIssues extends Component {
  render() {
    const submittedIssues = this.props.navigation.state.params.submittedIssues;

    return (
      <Container>
        <FlatList
          data={submittedIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SubmittedIssue
              navigation={this.props.navigation}
              question={item}
            />
          )}
        />
      </Container>
    );
  }
}
