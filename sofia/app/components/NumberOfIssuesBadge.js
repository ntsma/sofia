import React, {Component} from "react";

import {View} from "react-native";

import { Badge, Text} from "native-base";

export default class NumberOfIssuesBadge extends Component {
  render() {
    if(this.props.isConnected) {
      return(
        <Badge>
          <Text>{ this.props.number }</Text>
        </Badge>
      );
    } else {
      return(
        <View></View>
      );
    }
  }
}
