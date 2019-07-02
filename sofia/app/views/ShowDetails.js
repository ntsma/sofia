/*ShowDetails.js*/
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

export default class ShowDetails extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <ThemeProvider>
        <BackHeader navigation={this.props.navigation} name="Detalhes" />

        <Card title="Detalhes">
          <Text style={{marginBottom: 10}}>
            { this.props.navigation.state.params.item.description }
          </Text>
        </Card>

      </ThemeProvider>
    );
  }

}
