
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Text } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Questions extends Component<Props> {
  render() {
    return (
      <Container>
        <Text>Questions</Text>
      </Container>
    );
  }
}
