/*ShowDetails.js*/
import React, { Component } from "react";
import { ThemeProvider, Card, Badge } from "react-native-elements";
import { Button, Icon, Text } from "native-base";

export default class ShowDetails extends Component {
  render() {
    const item = this.props.navigation.state.params.item;
    return (
      <ThemeProvider>
        <Card title="Detalhes">
          <Text style={{ marginBottom: 10 }}>
            {this.props.navigation.state.params.item.description}
          </Text>
        </Card>
      </ThemeProvider>
    );
  }
}
