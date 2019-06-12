/*ErrorNoInternetMessage.js*/

import React, {Component} from "react";

import {Badge} from "react-native-elements";

export default class ErrorNoInternetMessage extends Component {

  render() {
    if(this.props.isConnected) {
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
