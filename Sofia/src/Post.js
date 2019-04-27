
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
          <CardItem>
            <Left>
              <Thumbnail source={require("./nts-logo.jpg")} />
              <Body>
                <Text>Núcleo de Telessaúde do Maranhão</Text>
                <Text note>Núcleo de Telessaúde do Maranhão</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem cardBody>
            <Image source={require("./liao.jpg")} style={{height: 200, width: null, flex: 1}} />
          </CardItem>
        </Card>
    );
  }
}
