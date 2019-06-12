import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  View
} from "react-native";

import {
  Badge,
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Textarea,
  Title,
  Thumbnail
} from "native-base";


export default class EvaluateButton extends Component {
  render() {
    if(this.props.buttonIsVisible) {
      return (
        <Button block success style={{ marginLeft: 30, marginRight: 30, marginTop: 30}}
          onPress={() => {
            this.judge();
          }}
          >
          <Text>Avaliar</Text>
        </Button>
      );

    } else {
      return(
        <Text></Text>
      );
    }

  }
}
