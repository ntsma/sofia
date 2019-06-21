/*CanceledIssue.js*/
import React, { Component } from "react";

import {
  ThemeProvider,
  Card,
  Badge
} from "react-native-elements";

import {

  Button,
  Icon,

  Text,

} from "native-base";

import BackHeader from "../components/BackHeader";

export default class ShowObservation extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <ThemeProvider>
        <BackHeader navigation={this.props.navigation} name="Observação" />

        <Card title="Observação">
          <Text style={{marginBottom: 10}}>
            { this.props.navigation.state.params.item.solicitation_observations_description }
          </Text>
        </Card>

        <Button
          block
          success
          onPress={() => this.props.navigation.navigate("EditCanceledIssue", {item})}
        >
          <Text>Editar pergunta</Text>
        </Button>
      </ThemeProvider>
    );
  }

}
