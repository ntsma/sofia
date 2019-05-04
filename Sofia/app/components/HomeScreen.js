
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { Container, Header, Text, Content, Tab, Tabs, Left, Right, Body, Button, Icon, Title } from 'native-base';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

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
          <Right>
            <Button
              iconLeft
              onPress={() => {
                this.props.navigation.navigate("NewQuestion");
              }}
              >
              <Icon type="AntDesign" name="plussquareo" />
              <Text>Nova Pergunta</Text>
            </Button>
          </Right>

        </Header>

        <Tabs>
          <Tab heading="Início">
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
