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
  Card,
  CardItem,
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

import {
    Rating,
    AirbnbRating

} from 'react-native-elements';


export default class Overlay extends Component {
    static navigationOptions = {
      header: null
    };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Image style={{ width: 30, height: 30}} source={require("./logo.png")} />
          </Left>
          <Body>
            <Title>Sofia</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
              <Label style={{ fontSize: 20 }}>{this.props.navigation.state.params.item.description}</Label>
            </View>

            <AirbnbRating
              count={5}
              reviews={["Péssimo", "Ruim", "Regular", "Boa", "Ótima"]}
              defaultRating={5}
              size={20}
            />

          </Form>
         </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent("Overlay", () => Overlay);
