
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Left, Right, Body, Button, Icon, Title } from 'native-base';

import Home from './Home';
import Questions from './Questions';
import Settings from './Settings';

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

          <Body>
            <Title>Sofia</Title>
          </Body>

        </Header>

        <Tabs>
          <Tab heading="Home">
            <Home />
          </Tab>
          <Tab heading="Perguntas">
            <Questions />
          </Tab>
          <Tab heading="Configurações">
            <Settings />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
