import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

import { CardItem, Segment, Icon, Header, Footer, Left, Right, Body, Button, Input, Card } from "native-base";

import QuestionBody from "./QuestionBody";


export default class Question extends Component<{}> {

  render() {
    return (
      <View>
        <Card>
          <CardItem header style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
            <Text style={{ fontSize: 20 }}>{this.props.question.title}</Text>
          </CardItem>

          <QuestionBody question={this.props.question} />
       </Card>
    </View>
    );
  }
}
