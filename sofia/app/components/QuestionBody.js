import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

import { CardItem, Input, Body } from "native-base";

import ShortAnswer from "./ShortAnswer";
import MultipleChoice from "./MultipleChoice";


export default class QuestionBody extends Component<{}> {

  render() {
    if(this.props.question.type == "shortAnswer") {
      return (
        <ShortAnswer question={ this.props.question } />
      );
    }

    if(this.props.question.type == "multipleChoice") {
      return (
        <MultipleChoice question={ this.props.question } />
      );
    }
  }
}
