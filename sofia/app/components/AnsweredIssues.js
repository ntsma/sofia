
import React, { Component } from "react";

import {
  Alert,
  AppRegistry,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

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

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

import Issue from "./Issue";

export default class AnsweredIssues extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const answeredIssues = this.props.navigation.state.params.answeredIssues;

    return (
      <Container>
        <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("HomeScreen") }
            >
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Voltar</Title>
          </Body>
          <Right>

          </Right>
        </Header>

        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Issue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
