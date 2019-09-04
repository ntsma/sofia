/*BackHeader.js*/
import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Body, Button, Header, Icon, Left, Right, Title, View } from "native-base";

export default class BackHeader extends Component {
  render() {
    return (
      <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
        <Left >
          <Button transparent style={{width: 50}}
          onPress={() => this.props.navigation.goBack() }>
            <Icon type="MaterialIcons" name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
      </Header>
    );
  }
}