import React, {Component} from "react";

import {View} from "react-native";

import { Badge, Button, Body, Icon, Left, Right, Text} from "native-base";

import NetInfo from "@react-native-community/netinfo";

export default class NumberOfIssuesBadge extends Component {
  constructor() {
    super();
    this.state = {
      "isConnected": false
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      console.log(state.isConnected);
      this.setState({
        "isConnected": state.isConnected
      });
    });
  }

  render() {
    if(this.state.isConnected) {
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
