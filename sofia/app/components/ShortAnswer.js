import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';

import { CardItem, Textarea, Input, Body } from "native-base";

export default class ShortAnswer extends Component<{}> {

  render() {
    const width = Dimensions.get("screen").width;
    return (
      <View>
        <CardItem>
          <Body>
            <Textarea rowSpan={5} bordered style={{ width: 300, marginLeft: 10, marginRight: 10}}/>
          </Body>
        </CardItem>
      </View>
    );
  }
}
