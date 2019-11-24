import React, {Component} from "react";

import {View} from "react-native";

import { Badge, Text} from "native-base";

export default class NumberOfIssuesBadge extends Component {
  render() {
    if(this.props.isConnected) {
      if(this.props.existsRequestsWithoutEvaluation == false) {
        return(
          <Badge danger>
            <Text>{ this.props.number }</Text>
          </Badge>
        );
      } else {
        return(
          <Badge style={{backgroundColor: '#3c8dbc'}}>
            <Text>{ this.props.number }</Text>
          </Badge>
        );
      }
    } else {
      return(
        <View></View>
      );
    }
  }
}
