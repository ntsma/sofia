/*DraftIssue.js*/

import React, { Component } from "react";

import {
  Card,
  Text,
  Badge
} from "react-native-elements";

export default class DraftIssue extends Component {

  render() {
    const item = this.props.question;
    return (
      <Card>
        <Text
          style={{marginBottom: 10}}
          onPress={() => this.props.navigation.navigate("EditQuestion", {item})}
        >
          {item.description}
        </Text>
      </Card>
    );
  }

}
