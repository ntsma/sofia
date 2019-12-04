import React, { Component } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";

import { Icon } from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";

import NumberOfIssuesBadge from "../components/NumberOfIssuesBadge";
import ErrorNoInternetMessage from "../components/ErrorNoInternetMessage";
import { get } from "../controllers/Issues.js";

import Requests from "../services/Request";

import homeStyles from "../Styles/HomeScreen";
import styles from "../Styles/Styles";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      refreshing: false,
      answeredIssues: [],
      submittedIssues: [],
      draftIssues: [],
      canceledIssues: [],
      existsRequestsWithoutEvaluation: false
    };
  }

  /*Remove header padrão*/
  static navigationOptions = {
    header: null
  };

  /*Aciona a ação de sair do app.*/
  logout = async () => {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("logging", "false");

    if (Platform.OS == "ios") {
      this.props.navigation.navigate("Login");
    } else {
      BackHandler.exitApp();
    }
  };

  /*Atualiza tela.*/
  refleshScreen = () => {
    this.setState({ refreshing: true });

    this.load();
    this.sendOfflineRequests();

    this.setState({ refreshing: false });
  };

  /*Carregando questões enviadas, respondidas, canceladas e rascunhos*/
  componentDidMount() {
    this.load();
  }

  /*Envia solicitações não enviadas por falta de internet. */
  sendOfflineRequests = async () => {
    var token = await AsyncStorage.getItem("token");
    var draftQuestions = await AsyncStorage.getItem("draftQuestions");

    draftQuestions = JSON.parse(draftQuestions);

    NetInfo.fetch().then(state => {
      if (state.isConnected && draftQuestions != null) {
        new Promise((resolve, reject) => {
          for (index in draftQuestions) {

            const descripton = draftQuestions[index].description;
            const file_ids = draftQuestions[index].file_ids;
  
            Requests.sendRequest(token, descripton, file_ids)
            .then(response => {
              resolve(response);
            })
            .catch(response => {
              reject(response);
            })
          }
        })
        .then(response => {
          this.emptyOfflineRequests();
        })
        .catch(response => {
          console.log(response);
        })
      }
    });
  };

  /*Esvazia listas de rascunhos enviados offline*/
  emptyOfflineRequests = async () => {
    await AsyncStorage.setItem("draftQuestions", JSON.stringify([]));
  }

  /*Carregando informações do app.*/
  load = () => {
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected
      });

      this.loadCanceledRequests();
      this.loadDraftRequests();
      this.loadAnsweredRequests();
      this.loadSentRequests();
    });
  };

  /*Carregando as solicitações de rascunhos.*/
  loadDraftRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    Requests.getDraftRequests(token)
      .then(response => {
        const draftRequests = response.data;
        this.setState({ draftIssues: draftRequests });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*Carregando as questões enviadas para a Sofia.*/
  loadSentRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    Requests.getSentRequests(token)
      .then(response => {
        const sentRequests = response.data;
        this.setState({ submittedIssues: sentRequests });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*Carregando as questões respondidas para a Sofia.*/
  loadAnsweredRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    Requests.getAnsweredRequests(token)
      .then(response => {
        const answeredRequests = response.data;

        this.setState({
          answeredIssues: answeredRequests
        });

        /*Procura por solicitações que não foram avaliadas.*/
        this.searchRequestsWithoutEvaluation();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*Procura por solicitações que não foram avaliadas.*/
  searchRequestsWithoutEvaluation = () => {
    /*Configura como se houvesse solicitações sem avaliação inicialmente.*/
    this.setState({
      existsRequestsWithoutEvaluation: false
    });

    var requestsWithoutEvaluation = [];

    new Promise((resolve, reject) => {
      try {
        for (index in this.state.answeredIssues) {
          if (this.state.answeredIssues[index].status_id == 21) {
            requestsWithoutEvaluation.push(this.state.answeredIssues[index]);
            this.state.answeredIssues.splice(index, 1);
          }
        }
        resolve("OK");
      } catch (error) {
        reject(error);
      }
    })
      .then(response => {
        if(!requestsWithoutEvaluation) {
          this.setState({
            existsRequestsWithoutEvaluation: true
          });
        }

        this.setState({
          answeredIssues: requestsWithoutEvaluation.concat(
            this.state.answeredIssues
          )
        });
      })
      .catch(error => {
        this.setState({
          answeredIssues: requestsWithoutEvaluation.concat(
            this.state.answeredIssues
          )
        });
      });
  };

  /*Obtendo as questões canceladas para a Sofia pelo Token*/
  loadCanceledRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    Requests.getCanceledRequests(token)
      .then(response => {
        const canceledRequests = response.data;

        this.setState({
          canceledIssues: canceledRequests
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateScreen() {
    try {
      if (this.props.navigation.state.params.shouldUpdate) {
        if (this.props.navigation.state.params.shouldUpdate == true) {
          this.load();

          this.props.navigation.state.params.shouldUpdate = false;
        }
      }
    } catch (e) {}
  }

  render() {
    this.updateScreen();

    const answeredIssues = this.state.answeredIssues;
    const submittedIssues = this.state.submittedIssues;
    const canceledIssues = this.state.canceledIssues;
    const draftIssues = this.state.draftIssues;
    const estado = this.state;

    return (
      <View>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <View style={homeStyles.Header}>
          <Image
            style={homeStyles.Image}
            source={require("../resources/logo.png")}
          />
          <Text style={[styles.TextLight, homeStyles.Title]}>Sofia</Text>
          <TouchableNativeFeedback onPress={this.logout}>
            <View style={homeStyles.ExitButton}>
              <View>
                <Icon
                  style={homeStyles.Icon}
                  type="MaterialIcons"
                  name="exit-to-app"
                />
              </View>
              <View>
                <Text style={styles.TextLight}>Sair</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={homeStyles.Body}>
          <ErrorNoInternetMessage isConnected={this.state.isConnected} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refleshScreen}
              />
            }
          >
            <View style={homeStyles.Container}>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate("Search")}
              >
                <View style={styles.Button}>
                  <Icon
                    style={[styles.Icon, { color: "#FFF" }]}
                    type="MaterialIcons"
                    name="question-answer"
                  />
                  <Text style={styles.TextLight}>Como posso te ajudar?</Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                disabled={!this.state.isConnected}
                onPress={() => {
                  this.props.navigation.navigate("AnsweredIssues", {
                    answeredIssues,
                    estado
                  });
                }}
              >
                <View style={[styles.Button, homeStyles.Gray]}>
                  <Icon style={styles.Icon} type="MaterialIcons" name="chat" />
                  <Text style={styles.TextDark}>Respondidas</Text>
                  <View style={styles.Badge}>
                    <NumberOfIssuesBadge
                      number={this.state.answeredIssues.length}
                      isConnected={this.state.isConnected}
                      existsRequestsWithoutEvaluation={
                        this.state.existsRequestsWithoutEvaluation
                      }
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                disabled={!this.state.isConnected}
                onPress={() => {
                  this.props.navigation.navigate("SubmittedIssues", {
                    submittedIssues
                  });
                }}
              >
                <View style={[styles.Button, homeStyles.Gray]}>
                  <Icon
                    style={styles.Icon}
                    type="MaterialIcons"
                    name="launch"
                  />
                  <Text style={styles.TextDark}>Enviadas</Text>
                  <View style={styles.Badge}>
                    <NumberOfIssuesBadge
                      number={this.state.submittedIssues.length}
                      isConnected={this.state.isConnected}
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                disabled={!this.state.isConnected}
                onPress={() => {
                  this.props.navigation.navigate("CanceledIssues", {
                    canceledIssues
                  });
                }}
              >
                <View style={[styles.Button, homeStyles.Gray]}>
                  <Icon
                    style={styles.Icon}
                    type="MaterialIcons"
                    name="cancel"
                  />
                  <Text style={styles.TextDark}>Devolvidas</Text>
                  <View style={styles.Badge}>
                    <NumberOfIssuesBadge
                      number={this.state.canceledIssues.length}
                      isConnected={this.state.isConnected}
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                disabled={!this.state.isConnected}
                onPress={() => {
                  this.props.navigation.navigate("DraftIssues", {
                    draftIssues
                  });
                }}
              >
                <View style={[styles.Button, homeStyles.Gray]}>
                  <Icon
                    style={styles.Icon}
                    type="MaterialIcons"
                    name="create"
                  />
                  <Text style={styles.TextDark}>Rascunhos</Text>
                  <View style={styles.Badge}>
                    <NumberOfIssuesBadge
                      number={this.state.draftIssues.length}
                      isConnected={this.state.isConnected}
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate("FAQ");
                }}
              >
                <View style={[styles.Button, homeStyles.Gray]}>
                  <Text
                    style={[styles.Icon, { marginLeft: 4, fontWeight: "700" }]}
                  >
                    ?
                  </Text>
                  <Text style={styles.TextDark}>Dúvidas gerais</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
