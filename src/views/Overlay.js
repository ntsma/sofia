import React, { Component } from "react";
import {
  AppRegistry,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import { Container, Content, Text } from "native-base";

import Evaluation from "../components/Evaluation";
import AsyncStorage from "@react-native-community/async-storage";

import Requests from '../services/Request';

export default class Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    this.onGetRequest();
  }

  /*Obtendo as questões enviadas para a Sofia pelo Token*/
  onGetRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    const request_id = this.props.navigation.state.params.item.id;

    Requests.getRequest(token, request_id)
    .then(response => {
      this.setState({
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
    return (
      <Container>
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
                  navigation={this.props.navigation}
                  data={this.state.data}
                  judgeType="1"
                  buttonIsVisible={false}
                />
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
const height = Dimensions.get("window").height;

const searchStyles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    marginTop: 20
  },

  Input: {
    width: "100%",
    height: height * 0.5,
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20
  }
});

/*
<Form>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
              <Label style={{ fontSize: 20 }}>{this.props.navigation.state.params.item.description}</Label>
            </View>

            <Card title="Resposta">
              <Text>{this.state.answer}</Text>
            </Card>

            <Card title="Complemento">
              <Text>{this.state.complement}</Text>
            </Card>

            <Card title="Atributos">
              <Text>{this.state.attributes}</Text>
            </Card>

            <Card title="Educação Permanente">
              <Text>{this.state.permanent_education}</Text>
            </Card>

            <Card title="Referências">
              <Text>{this.state.references}</Text>
            </Card>

            <Evaluation />

          </Form>
          */

AppRegistry.registerComponent("Overlay", () => Overlay);
