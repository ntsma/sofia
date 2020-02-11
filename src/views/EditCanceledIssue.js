/*EditQuestion.js*/

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Label,
  Text,
  Textarea
} from "native-base";

import AsyncStorage from "@react-native-community/async-storage";

import Requests from "../services/Request";

export default class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      description: ""
    };
  }

  componentDidMount() {
    this.setState({
      description: this.props.navigation.state.params.item.description
    });
  }

  updateRequest = async () => {
    const request_id = this.props.navigation.state.params.item.id;
    const token = await AsyncStorage.getItem("token");
    const description = this.state.description;

    Requests.updateRequest(token, description, request_id)
      .then(response => {
        this.props.navigation.navigate("HomeScreen", {
          shouldUpdate: true
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const item = this.props.navigation.state.params.item;

    return (
      <Container>
        <Content>
          <Form style={styles.container}>
            <View style={styles.title}>
              <Label style={styles.textTitle}>Descreva sua pergunta</Label>
            </View>
            <Textarea
              value={this.state.description}
              style={styles.textArea}
              rowSpan={10}
              onChangeText={description => this.setState({ description })}
              placeholder="Sua pergunta..."
              placeholderTextColor="#ccc"
              bordered
            />
            <Button
              block
              success
              style={styles.button}
              onPress={this.onCreateQuestion.bind(this)}
            >
              <Text>Atualizar</Text>
              <Icon type="MaterialIcons" name="file-upload" />
            </Button>
            <View style={{ height: 3 }}></View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3c8dbc"
  },
  image: {
    width: 40,
    height: 40
  },
  button: {
    width: "90%",
    height: 60,
    marginTop: 10,
    marginLeft: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    alignItems: "center"
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    margin: 10
  },
  textTitle: {
    fontSize: 20
  },
  textArea: {
    width: "90%",
    backgroundColor: "#f6f6f6"
  }
});
