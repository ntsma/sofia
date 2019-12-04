/*CanceledIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container } from "native-base";

import CanceledIssue from "../components/CanceledIssue";
import BackHeader from "../components/BackHeader";

export default class CanceledIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const {canceledIssues} = this.props.navigation.state.params;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Devolvidas" />
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
