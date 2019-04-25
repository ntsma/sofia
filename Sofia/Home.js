
import React, {Component} from 'react';
import {Image, ScrollView} from 'react-native';
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


import Post from './Post';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (
      <ScrollView>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />

      </ScrollView>
    );
  }
}
