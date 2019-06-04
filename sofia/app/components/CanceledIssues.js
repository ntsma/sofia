/*CanceledIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

import Issue from "./Issue";
import BackHeader from "./BackHeader";

export default class CanceledIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const canceledIssues = this.props.navigation.state.params.canceledIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Canceladas" />

        <FlatList
          data={canceledIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Issue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
