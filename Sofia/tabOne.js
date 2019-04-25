
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Text } from 'native-base';

import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class tabOne extends Component<Props> {
  render() {
    return (
      <Container>
        <Text>Um</Text>
      </Container>
    );
  }
}
