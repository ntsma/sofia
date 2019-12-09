/*CanceledIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container } from "native-base";

import CanceledIssue from "../components/CanceledIssue";

export default class CanceledIssues extends Component {
  render() {
    const { canceledIssues } = this.props.navigation.state.params;

    return (
      <Container>
        <FlatList
          data={canceledIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CanceledIssue navigation={this.props.navigation} question={item} />
          )}
        />
      </Container>
    );
  }
}
