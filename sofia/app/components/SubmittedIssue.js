
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

export default class SubmittedIssue extends Component {

  render() {
    return (
      <Card>
        <CardItem cardBody>
          <Text>{this.props.question.description}</Text>
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

AppRegistry.registerComponent("SubmittedIssue", () => SubmittedIssue);
