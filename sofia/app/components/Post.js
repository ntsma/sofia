import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, Image} from 'react-native';

import {
  Badge,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Title,
  Thumbnail
} from "native-base";

export default class Post extends Component<{}> {

  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require("../resources/logo.png")} />
            <Body>
              <Text>Núcleo de Telessaúde</Text>
              <Text note>Equipe de Comunicação</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem cardBody>
          <Image source={require("../resources/1.jpg")} style={{height: 200, width: 200, flex: 1}}/>
        </CardItem>

        <CardItem>
          <Left>
            <Button transparent>
              <Icon active type="MaterialIcons" name="search" />
              <Text>Visualizar</Text>
            </Button>
          </Left>

          <Right>
            <Text>11h atrás</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
