/*BackHeader.js*/
import React, { Component } from "react";
import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";

export default class BackHeader extends Component {
  render() {
    return (
      <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
        <Left>
          <Button transparent
          onPress={() => this.props.navigation.goBack() }>
            <Icon style={{ color: '#FFF' }} type="MaterialIcons" name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#FFF'}}>{this.props.name}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
    );
  }
}