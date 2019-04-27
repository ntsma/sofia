
import React, {Component} from 'react';
import {Image} from 'react-native';
import {Platform, StyleSheet} from 'react-native';
import {

  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button,
  Icon

} from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Post extends Component<Props> {
  render() {
    return (
      <Card>
          <CardItem header>
            <Text>Quais são os principais sintomas da Dengue?</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Olá, eu gostaria de saber quais são os principais sintomas da Dengue e o que a diferia de Zika?
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>#dengue #sintomas #zika</Text>
          </CardItem>
       </Card>
    );
  }
}
