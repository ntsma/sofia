import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, FlatList} from 'react-native';

import { CardItem, Input, Body, Content, Container } from "native-base";
import { Text, ListItem, Left, Right, Radio } from "native-base";

import Choice from "./Choice";

export default class MultipleChoice extends Component<{}> {
  state = {
    data: this.props.question.choices
    };



onPress = data => this.setState({ data });

  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
    return (
      <Container>
        <Content>

          <Text>Value = {selectedButton}</Text>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18,
        marginBottom: 50,
    },
});
