/*NewQuestion.js*/

import React, { Component } from "react";

import { Platform, Alert } from "react-native";

import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View
} from "react-native";

import { Icon, Textarea } from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import ImagePicker from "react-native-image-picker";
import BackHeader from "../components/BackHeader";

export default class NewSearch extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      file_ids: "",
      source: "",
      question: "",
      isDraftModalVisible: false,
      isModalVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.navigation.state.params.question
    });
  }

  changeModalDraftVisibility = bool =>
    this.setState({ isDraftModalVisible: bool });

  changeModalQuestionVisibility = bool =>
    this.setState({ isModalVisible: bool });

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

        console.log("Carregando imagem...");
        console.log(this.state.source.fileName);

        console.log("TOKEN");
        console.log(token);

        console.log("BODY");
        console.log(this.createFormData(this.state.source, { userId: "123" }));

        const data = new FormData();

        data.append("photos[]", {
          uri: response.uri,
          name: response.fileName,
          type: "image/jpg"
        });

        fetch("http://sofia.huufma.br/api/solicitation/file/upload", {
          method: "POST",
          Accept: "application/json",
          "Content-Type":
            "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d",
          headers: {
            Authorization: "Bearer " + token
          },
          body: data
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload success", response);
            alert("Foto carregada com sucesso!");

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
    this.props.navigation.navigate("HomeScreen", { shouldUpdate });
  }

  async onCreateQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let formdata = new FormData();

        formdata.append("type_id", 52);
        formdata.append("mode", "send");
        formdata.append("description", question);
        formdata.append("mobile", 1);
        formdata.append("file_ids", this.state.file_ids);

        console.log(formdata);

        return fetch("http://sofia.huufma.br/api/solicitation/handle", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token
          },
          body: formdata
        })
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              question: ""
            });

            shouldUpdate = true;
            this.props.navigation.navigate("Success", { shouldUpdate });
          })
          .catch(error => {
            console.error(error);
            Alert.alert("Houve um problema!");
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

  async onSearch() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    let formdata = new FormData();

    formdata.append("description", question);

    return fetch("http://sofia.huufma.br/api/solicitation/search", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        console.debug("RETURNING...");
        console.debug(responseJson);

        var questions = responseJson.data;

        shouldUpdate = true;

        this.props.navigation.navigate("RelatedQuestionsView", { questions });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async onCreateDraftQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    console.debug("DENTRO DE QUESTION");
    console.debug(question);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "draft");
    formdata.append("mobile", 1);
    formdata.append("description", question);

    console.debug(formdata);

    return fetch("http://sofia.huufma.br/api/solicitation/handle", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        console.debug("RESPOSTA");
        console.debug(responseJson);

        this.setState({
          question: ""
        });

        shouldUpdate = true;
        this.props.navigation.navigate("HomeScreen", { shouldUpdate });
      })
      .catch(error => {
        console.error(error);

        Alert.alert("Houve um problema!");
      });
  }

  onPressButtonSend() {
    this.changeModalQuestionVisibility(true);
    this.onCreateQuestion();
    //console.log('çodal', this.isModalVisible)
  }

  onPressButtonDraft() {
    this.changeModalDraftVisibility(true);
    this.onCreateDraftQuestion();
    //console.log('çodal', this.isModalVisible)
  }

  render() {
    return (
      <View>
        <BackHeader
          navigation={this.props.navigation}
          name="Como posso te ajudar?"
        />
        {this.state.isLoading ? (
          <ActivityIndicator style={styles.load} size="large" color="#3c8dbc" />
        ) : (
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
                <TouchableNativeFeedback onPress={this.onUploadFile.bind(this)}>
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
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.onPressButtonDraft.bind(this)}
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
                    <Text style={styles.TextDark}>
                      Salvar como{"\n"}rascunho
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <TouchableNativeFeedback
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
              </TouchableNativeFeedback>
            </View>
          </View>
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
