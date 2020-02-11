/*RelatedIssueView.js*/

import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  BackHandler
} from "react-native";

import { Container, Content, Header, Item, Input, Title } from "native-base";

import { Text, StatusBar } from "react-native";
import { Button, Icon } from "native-base";

import Evaluation from "../components/Evaluation";

import ModalComponent from "../components/ModalComponent";

import AsyncStorage from "@react-native-community/async-storage";

import { getRequest } from "../services/Request";

export default class RelatedIssueView extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      answer: "",
      data: null,
      status_description: "",
      answer: "",
      complement: "",
      attributes: "",
      permanent_education: "",
      references: "",
      sastifaction: 0,
      attendance: 0,
      showME: true
    };
  }

  handleOpen = value => {
    this.setState({ isVisible: true, value: value });
  };

  handleClose = () => {
    this.setState({ isVisible: false });
    this.props.navigation.goBack();
  };

  componentDidMount() {
    this.getRelatedIssue();
  }

  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  };

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  async getRelatedIssue() {
    const token = await AsyncStorage.getItem("token");
    const request_id = this.props.navigation.state.params.item.id;

    getRequest(token, request_id)
      .then(response => {
        this.setState({
          answer_id: response.data.answer_id,
          data: response.data,
          status_description: response.data.status_description,
          answer: response.data.answer,
          complement: response.data.complement,
          attributes: response.data.attributes,
          permanent_education: response.data.permanent_education,
          references: response.data.references,
          showME: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { isVisible } = this.state;

    return (
      <Container>
        <Header style={header.background}>
          <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />
          <View style={header.container}>
            <Button transparent style={header.button} onPress={this.handleOpen}>
              <Icon
                style={header.icon}
                type="MaterialIcons"
                name="arrow-back"
              />
            </Button>
            {isVisible && (
              <ModalComponent
                isVisible={this.isVisible}
                onClose={this.handleClose}
                hasButton={true}
                content={
                  <View style={styles.ModalContainer}>
                    <Evaluation
                      onClose={this.handleClose}
                      navigation={this.props.navigation}
                      data={this.state.data}
                      judgeType="0"
                      buttonIsVisible={true}
                    />
                    <Button
                      onPress={() => this.props.navigation.goBack()}
                      block
                      light
                      style={{ marginLeft: 20, marginRight: 20 }}
                    >
                      <Text>Voltar para respostas encontradas</Text>
                    </Button>
                  </View>
                }
              />
            )}

            <Text style={header.text}>Pergunta Relacionada</Text>
          </View>
        </Header>

        <Content>
          {this.state.showME ? (
            <Container style={styles.load}>
              <ActivityIndicator size="large" color="#3c8dbc" />
            </Container>
          ) : (
            <View style={styles.container}>
              <Text style={styles.header}>
                {this.props.navigation.state.params.item.description}
              </Text>
              <View style={styles.section}>
                <Text style={styles.title}>Resposta</Text>
                <Text style={styles.text}>{this.state.answer}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Complemento</Text>
                <Text style={styles.text}>{this.state.complement}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Atributos</Text>
                <Text style={styles.text}>{this.state.attributes}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Educação Permanente</Text>
                <Text style={styles.text}>
                  {this.state.permanent_education}
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Referências</Text>
                <Text style={styles.text}>{this.state.references}</Text>
              </View>

              <View style={styles.section}>
                <Evaluation
                  onClose={this.handleClose}
                  navigation={this.props.navigation}
                  data={this.state.data}
                  judgeType="0"
                  buttonIsVisible={true}
                />
              </View>

              <Button
                onPress={() => this.props.navigation.goBack()}
                block
                light
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                <Text>Voltar para respostas encontradas</Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  ModalContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },

  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    margin: 10,
    padding: 5,
    backgroundColor: "#fafcfd"
  },
  section: {
    padding: 5,
    marginBottom: 10
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    padding: 5,
    paddingBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomColor: "#bbb",
    borderBottomWidth: 0.5
  }
});

const header = StyleSheet.create({
  background: {
    backgroundColor: "#3c8dbc"
  },

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    backgroundColor: "#3c8dbc",
    width: 50
  },

  icon: {
    width: 37,
    color: "#FFF",
    fontSize: 25,
    marginRight: 17,
    marginLeft: 20,
    textAlign: "center"
  },

  text: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600"
  }
});
