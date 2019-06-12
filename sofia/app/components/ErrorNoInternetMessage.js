import React, {Component} from "react";

import {Text, View} from "react-native";

import {Badge} from "react-native-elements";

import NetInfo from "@react-native-community/netinfo";

export default class ErrorNoInternetMessage extends Component {
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
        <Badge value="Você está conectado!" status="success" />
      );
    } else {
      return(
        <Badge value="Você não está conectado!" status="error" />
      );
    }
  }
}
