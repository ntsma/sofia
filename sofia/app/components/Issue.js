
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
  Body,
  Button,
  CardItem,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Title,
  Thumbnail
} from "native-base";

import {
  Card,
  Text,
  Badge
} from "react-native-elements";

import { StackNavigator } from "react-navigation";

export default class Issue extends Component {

  render() {
    const item = this.props.question;
    return (
      <Card>
        <Badge
          value="Aguardando"
          status="warning"
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
        <Text
          style={{marginBottom: 10}}
          onPress={() => this.props.navigation.navigate("Overlay", {item})}
        >
          {item.description}
        </Text>
      </Card>
    );
  }

}

AppRegistry.registerComponent("Issue", () => Issue);
