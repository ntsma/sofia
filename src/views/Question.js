/*NewQuestion.js*/
import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Keyboard,
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
import {uploadImages} from '../services/Images';

export default class NewSearch extends Component {
  constructor() {
    super();
    this.state = {
      file_ids: "",
      source: "",
      question: "",
      modalIsVisible: false,
      message: "",
      success: true
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.navigation.state.params.question
    });
  }

  handleOpen(message, success) {
    this.setState({
      modalIsVisible: true,
      message: message,
      success: success
    });
  }

  handleClose() {
    this.setState({ modalIsVisible: false });
    if (this.state.success) {
      this.props.navigation.navigate("HomeScreen", { shouldUpdate });
    }
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

          this.handleOpen("Foto carregada com sucesso.", false);

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
    this.handleOpen(
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
              question: ""
            });

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
        this.handleOpen("Sua solicitação foi salva como rascunho.", true);
      })
      .catch(error => {
        console.log(error);
        this.handleOpen("Erro ao salvar a solicitação como rascunho.", false);
      });
  }

  render() {
    const { modalIsVisible } = this.state;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View
        style={[
          { flex: 1 },
          modalIsVisible && { backgroundColor: "rgba(0, 0, 0, 0.05)" }
        ]}
        onStartShouldSetResponder={this.handleUnhandledTouches}
      >
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
              <TouchablePlatformSpecific onPress={this.onUploadFile.bind(this)}>
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
                    style={[styles.Icon, { left: 10 }]}
                    type="MaterialIcons"
                    name="create"
                  />
                  <Text style={styles.TextDark}>Salvar como{"\n"}rascunho</Text>
                </View>
              </TouchablePlatformSpecific>
            </View>
            <TouchablePlatformSpecific
              onPress={this.onCreateQuestion.bind(this)}
            >
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="search"
                />
                <Text style={styles.TextLight}>Enviar pergunta</Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
        </View>

        {modalIsVisible && (
          <ModalComponent
            handleClose={this.handleClose.bind(this)}
            isModalVisible={this.modalIsVisible}
            content={
              <View>
                <Text>
                  {this.state.message}
                </Text>
              </View>
            }
          />
        )}
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
    marginTop: 20
  },

  Title: {
    fontSize: 16
  },

  Input: {
    width: "100%",
    height: height * 0.45,
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
