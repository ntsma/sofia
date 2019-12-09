import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View,
  Keyboard
} from "react-native";
import { Icon, Textarea } from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import BackHeader from "../components/BackHeader";
import NetInfo from "@react-native-community/netinfo";

import Requests from "../services/Request";
import styles from "../Styles/Styles";

export default class Search extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      source: "",
      question: "",
      isLoading: false
    };
  }

  handleUnhandledTouches() {
    Keyboard.dismiss();
    return false;
  }

  showLoader = bool => this.setState({ isLoading: bool });

  /*Procura solicitações semelhantes.*/
  onSearch = async () => {
    var question = this.state.question;
    var token = await AsyncStorage.getItem("token");

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.props.navigation.navigate("Question", { question });
      } else {
        /*Mostra barra de carregamento.*/
        this.setState({ isLoading: true });

        Requests.searchRequests(token, question)
          .then(response => {
            var questions = response.data;
            var user_questions = response.users_solicitations;

            /*Remove barra de carregamento.*/
            this.setState({ isLoading: false });

            if (!questions) {
              this.props.navigation.navigate("SearchNoResults", {
                question
              });
            } else {
              this.props.navigation.navigate("RelatedQuestionsView", {
                questions,
                user_questions,
                question
              });
            }
          })
          .catch(response => {
            console.log(response);
          });
      }
    });
  };

  render() {
    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View onStartShouldSetResponder={this.handleUnhandledTouches}>
        <BackHeader
          navigation={this.props.navigation}
          name="Como posso te ajudar?"
        />
        {this.state.isLoading ? (
          <ActivityIndicator
            style={searchStyles.load}
            size="large"
            color="#3c8dbc"
          />
        ) : (
          <View style={searchStyles.Container}>
            <Text style={styles.Title}>
              Digite aqui sua pergunta para que sejam encontradas respostas
              adequadas
            </Text>

            <Textarea
              style={searchStyles.Input}
              value={this.state.question}
              onChangeText={question => this.setState({ question })}
              placeholder="Digite aqui ..."
              placeholderTextColor="#999"
              bordered
            />

            <TouchablePlatformSpecific onPress={this.onSearch.bind(this)}>
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="search"
                />
                <Text style={styles.TextLight}>Pesquisar</Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
        )}
      </View>
    );
  }
}

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
