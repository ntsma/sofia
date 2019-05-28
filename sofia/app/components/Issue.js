
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

import { StackNavigator } from "react-navigation";

export default class Issue extends Component {

  render() {
      const item = this.props.question;
    return (
      <Card>
        <CardItem cardBody>
          <Text>{item.description}</Text>
        </CardItem>

        <CardItem>
          <Left>
              <Button transparent
                  onPress={() => {
                    this.props.navigation.navigate("Overlay", {item});
                  }}
              >
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

AppRegistry.registerComponent("Issue", () => Issue);
