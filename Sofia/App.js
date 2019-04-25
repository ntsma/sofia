
import React, {Component} from 'react';

import {
  Platform,
  StyleSheet
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Title,
  Left,
  Right,
  Body
} from 'native-base';

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
export default class App extends Component<Props> {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left/>
          <Body>
            <Title>Sofia</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading="Home">
            <Tab1 />
          </Tab>
          <Tab heading="Perguntas">
            <Tab2 />
          </Tab>
          <Tab heading="Configurações">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
