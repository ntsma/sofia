import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar} from 'react-native';

import { CardItem, Input, Body, Text, ListItem, Left, Right, Radio, Content } from "native-base";

export default class Choice extends Component<{}> {

  render() {
    return (
      <ListItem>
        <Left>
          <Text>{ this.props.choice }</Text>
        </Left>
        <Right>
          <Radio selected="true"/>
        </Right>
      </ListItem>
    );
  }
}
