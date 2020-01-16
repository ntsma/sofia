/*NewQuestion.js*/
import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableNativeFeedback,
  TouchableHighlight,
  Text,
  View
} from "react-native";
import { Icon, Textarea } from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import ImagePicker from "react-native-image-picker";
import ModalComponent from "../components/ModalComponent";

import Requests from "../services/Request";
import { uploadImages } from "../services/Images";

export default class NewSearch extends Component {
  constructor() {
    super();
    this.state = {
      file_ids: "",
      source: "",
      question: "",
      modalIsVisible: false,
      forwardModalIsVisible: false,
      message: "",
      success: true
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.navigation.state.params.question
    });
  }

  handleModalOpen(message, success) {
    this.setState({
      modalIsVisible: true,
      message: message,
      success: success
    });
  }

  handleModalClose() {
    this.setState({ modalIsVisible: false });
    if (this.state.success) {
      this.props.navigation.navigate("HomeScreen", { shouldUpdate });
    }
  }

  handleForwardModalOpen() {
    this.setState({
      forwardModalIsVisible: true
    });
  }

  handleForwardModalClose() {
    this.setState({ forwardModalIsVisible: false });
  }

  handleUnhandledTouches() {
    Keyboard.dismiss();
    return false;
  }

  createFormData(photo, body) {
    const data = new FormData();

    data.append("photos[]", [
      {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android"
            ? photo.uri
            : photo.uri.replace("file://", "")
      }
    ]);

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  }

  async onUploadFile() {
    var token = await AsyncStorage.getItem("token");

    const options = {
      title: "Escolha uma imagem",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("Usuário cancelou a image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        this.setState({
          source: response
        });

        uploadImages(token, response)
          .then(response => {
            console.log("upload success", response);

            this.handleModalOpen("Foto carregada com sucesso.", false);

            ids = "";
            for (index in response.files) {
              ids += response.files[index].fileID + ", ";
            }

            this.setState({ file_ids: ids });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("O carregamento da foto falhou!");
          });
      }
    });
  }

  async saveDraftIntoAsyncStorage(question) {
    var questions = await AsyncStorage.getItem("draftQuestions");

    if (!questions) {
      await AsyncStorage.setItem("draftQuestions", JSON.stringify([]));
      var questions = await AsyncStorage.getItem("draftQuestions");
    }

    questions = JSON.parse(questions);

    questions.push(question);

    await AsyncStorage.setItem("draftQuestions", JSON.stringify(questions));

    var draftQuestions = await AsyncStorage.getItem("draftQuestions");

    console.log("Questões de Rascunho");
    console.log(draftQuestions);

    this.setState({
      question: ""
    });

    shouldUpdate = true;
    this.handleModalOpen(
      "Sua solicitação foi salva como rascunho devido a falta de conexão com a internet.",
      true
    );
  }

  async onCreateQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Requests.sendRequest(token, question, this.state.file_ids)
          .then(response => {
            this.setState({
              question: "",
              file_ids: ""
            });
            console.log(response);
            shouldUpdate = true;
            this.props.navigation.navigate("Success", { shouldUpdate });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.saveDraftIntoAsyncStorage({
          id: this.state.question.length + 1,
          description: question,
          file_ids: this.state.file_ids
        });
      }
    });
  }

  async onCreateDraftQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    Requests.sendDraftRequest(token, question, this.state.file_ids)
      .then(response => {
        this.setState({
          question: ""
        });

        shouldUpdate = true;
        this.handleModalOpen("Sua solicitação foi salva como rascunho.", true);
      })
      .catch(error => {
        console.log(error);
        this.handleModalOpen(
          "Erro ao salvar a solicitação como rascunho.",
          false
        );
      });
  }

  render() {
    const { modalIsVisible } = this.state;
    const { forwardModalIsVisible } = this.state;
    var question = this.state.question;
    var file_ids = this.state.file_ids;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View onStartShouldSetResponder={this.handleUnhandledTouches}>
        <ScrollView>
          <View style={styles.Container}>
            <Text style={styles.Title}>
              Digite aqui sua pergunta para que sejam encontradas respostas
              adequadas
            </Text>

            <Textarea
              style={styles.Input}
              value={this.state.question}
              onChangeText={question => this.setState({ question })}
              placeholder="Digite aqui..."
              placeholderTextColor="#999"
              bordered
            />

            <View>
              <View style={styles.ButtonContainer}>
                <TouchablePlatformSpecific
                  onPress={this.onUploadFile.bind(this)}
                >
                  <View
                    style={[
                      styles.Button,
                      { width: "48%", backgroundColor: "#eee" }
                    ]}
                  >
                    <Icon
                      style={[styles.Icon, { left: 10 }]}
                      type="MaterialIcons"
                      name="attach-file"
                    />
                    <Text style={styles.TextDark}>Inserir{"\n"}anexo</Text>
                  </View>
                </TouchablePlatformSpecific>
                <TouchablePlatformSpecific
                  onPress={this.onCreateDraftQuestion.bind(this)}
                >
                  <View
                    style={[
                      styles.Button,
                      { width: "48%", backgroundColor: "#eee" }
                    ]}
                  >
                    <Icon
                      style={[styles.Icon, { left: 6, fontSize: 20 }]}
                      type="MaterialIcons"
                      name="create"
                    />
                    <Text style={styles.TextDark}>
                      Salvar como{"\n"}rascunho
                    </Text>
                  </View>
                </TouchablePlatformSpecific>
              </View>
              <TouchablePlatformSpecific
                onPress={() => {
                  this.handleForwardModalOpen();
                }}
              >
                <View style={styles.Button}>
                  <Icon
                    style={[styles.Icon, { color: "#FFF" }]}
                    type="MaterialIcons"
                    name="search"
                  />
                  <Text style={styles.TextLight}>Prosseguir</Text>
                </View>
              </TouchablePlatformSpecific>
            </View>
          </View>

          {modalIsVisible && (
            <ModalComponent
              handleModalClose={this.handleModalClose.bind(this)}
              isModalVisible={this.modalIsVisible}
              content={
                <View>
                  <Text>{this.state.message}</Text>
                </View>
              }
            />
          )}

          {forwardModalIsVisible && (
            <ModalComponent
              isVisible={this.forwardModalIsVisible}
              onClose={this.handleForwardModalClose}
              hasButton={true}
              content={
                <View style={styles.Container}>
                  <Text style={styles.Title}>
                    A solicitação é sobre um paciente específico?
                  </Text>
                  <View>
                    <TouchablePlatformSpecific
                      onPress={() => {
                        this.setState({ forwardModalIsVisible: false });
                        this.props.navigation.navigate("ForwardQuestion", {
                          question, file_ids
                        });
                      }}
                    >
                      <View style={[styles.Button, { marginBottom: 20 }]}>
                        <Text style={styles.TextLight}>Sim</Text>
                      </View>
                    </TouchablePlatformSpecific>

                    <TouchablePlatformSpecific
                      onPress={() => {
                        this.setState({ forwardModalIsVisible: false });
                        this.onCreateQuestion();
                      }}
                    >
                      <View style={[styles.Button, { marginBottom: 20 }]}>
                        <Text style={styles.TextLight}>
                          Não, enviar pergunta agora
                        </Text>
                      </View>
                    </TouchablePlatformSpecific>
                  </View>
                </View>
              }
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    marginTop: 20,
    justifyContent: "center"
  },

  Title: {
    fontSize: 16,
    marginBottom: 20
  },

  Input: {
    width: "100%",
    height: height * 0.35,
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#3c8dbc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  ButtonContainer: {
    flexDirection: "row",
    height: 54,
    justifyContent: "space-between",
    marginBottom: 10
  },

  Icon: {
    position: "absolute",
    left: 20,
    color: "#202020",
    fontSize: 24
  },

  TextLight: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  },

  TextDark: {
    fontSize: 14,
    color: "#202020",
    fontWeight: "600",
    textAlign: "center"
  }
});

const button = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 37,
    marginRight: 37
  },

  Selected: {
    width: 100,
    height: 54,
    backgroundColor: "#3c8dbc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  Unselected: {
    width: 100,
    height: 54,
    backgroundColor: "#EEE",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  TextSelected: {
    textAlign: "center",
    color: "#FFF"
  },

  TextUnselected: {
    textAlign: "center",
    color: "#3c8dbc"
  }
});

const localStyles = StyleSheet.create({
  Container: {
    marginTop: 20,
    marginLeft: 37,
    marginRight: 37
  },

  Text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    color: "#202020",
    marginTop: 10
  },

  Input: {
    flexDirection: "row",
    height: 46,
    width: "80%",
    alignSelf: "stretch",
    backgroundColor: "#e4e4e4",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15,
    color: "#454545"
  }
});
