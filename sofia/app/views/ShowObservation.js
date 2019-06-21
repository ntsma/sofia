/*CanceledIssue.js*/
import React, { Component } from "react";

import {
  ThemeProvider,
  Card,
  Text,
  Badge
} from "react-native-elements";

import BackHeader from "../components/BackHeader";

export default class ShowObservation extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const item = this.props.question;
    return (
      <ThemeProvider>
        <BackHeader navigation={this.props.navigation} name="Observação" />

        <Card title="Observação">
          <Text style={{marginBottom: 10}}>
            { this.props.navigation.state.params.item.solicitation_observations_description }
          </Text>
        </Card>
      </ThemeProvider>
    );
  }

}
