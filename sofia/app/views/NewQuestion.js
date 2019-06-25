/*NewQuestion.js*/

import React, { Component } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  Modal
} from "react-native";

import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  Icon,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Title,
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import NetInfo from "@react-native-community/netinfo";

import ImagePicker from 'react-native-image-picker';

import BackHeader from "../components/BackHeader";

import QuestionSentPopUp from "../components/QuestionSentPopUp";

import DraftPopUp from "../components/DraftPopUp";


export default class NewQuestion extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      "source": "",
      "question": "",
      "isDraftModalVisible": false,
      "isModalVisible": false,
    };
  }

  changeModalDraftVisibility = (bool) => (
    this.setState({ isDraftModalVisible : bool })
  )

  changeModalQuestionVisibility = (bool) => (
    this.setState({ isModalVisible : bool })
  )

  onUploadFile() {
    const options = {
      title: 'Escolha uma imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('Usuário cancelou a image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        this.setState({
          "source": response
        });

        console.log("Carregando imagem...")
        console.log(this.state.source.fileName);
      }
    });

  }


  async saveDraftIntoAsyncStorage(question) {
    var questions = await AsyncStorage.getItem("draftQuestions");

    if(!questions) {
      await AsyncStorage.setItem("draftQuestions", JSON.stringify([]));
      var questions = await AsyncStorage.getItem("draftQuestions");
    }

    questions = JSON.parse(questions);

    questions.push(question);

    await AsyncStorage.setItem("draftQuestions", JSON.stringify(questions));

    var draftQuestions = await AsyncStorage.getItem("draftQuestions");

    console.log("Questões de Rascunho");
    console.log(draftQuestions);
  }

  async onCreateQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    NetInfo.fetch().then(state => {

      if(state.isConnected) {
        let formdata = new FormData();

        formdata.append("type_id", 52);
        formdata.append("mode", 'send');
        formdata.append("description", question)

        return fetch('http://plataforma.homolog.huufma.br/api/solicitation/handle', {
            method: 'POST',
            headers: {
              Authorization: "Bearer " + token
            },
            body: formdata,
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.debug("RESPOSTA");
            console.debug(responseJson);

            this.props.navigation.navigate("HomeScreen");
          })
          .catch((error) => {
            console.error(error);
          });

      } else {
        this.saveDraftIntoAsyncStorage({"id": this.state.question.length + 1, "description": question});
      }
    });
  }


  async onCreateDraftQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    console.debug("DENTRO DE QUESTION");
    console.debug(question);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", 'draft');
    formdata.append("description", question)

    console.debug(formdata);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/handle', {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + token
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug("RESPOSTA");
        console.debug(responseJson);

        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error(error);
      });

  }

  onPressButtonSend(){
    this.changeModalQuestionVisibility(true);
    this.onCreateQuestion();
    //console.log('çodal', this.isModalVisible)
  }

onPressButtonDraft(){
  this.changeModalDraftVisibility(true);
  this.onCreateDraftQuestion();
  //console.log('çodal', this.isModalVisible)
}

  onPressButtonSend(){
    this.changeModalQuestionVisibility(true);
    this.onCreateQuestion();
    //console.log('çodal', this.isModalVisible)
  }

  onPressButtonDraft(){
    this.changeModalDraftVisibility(true);
    this.onCreateDraftQuestion();
    //console.log('çodal', this.isModalVisible)
  }


  render() {
    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Nova Pergunta"/>

        <Content>

          <Form style={styles.container}>
            <View style={styles.title}>
              <Label style={styles.textTitle}>Descreva sua pergunta</Label>
            </View>
            <Textarea style={styles.textArea} rowSpan={10} onChangeText={(question) => this.setState({question})} placeholder="Sua pergunta..." placeholderTextColor="#ccc" bordered />

              <Button block success style={styles.button} onPress={() => this.onUploadFile() }>
                <Text>Anexar</Text>
                <Icon type="MaterialIcons" name="file-upload"/>
              </Button>

              <Button block success style={styles.button} onPress={this.onPressButtonSend.bind(this)}>
                <Text>Enviar Pergunta</Text>
                <Icon type="MaterialIcons" name="file-upload"/>
              </Button>
              <Modal transparent={true} visible={this.state.isModalVisible} onRequestClose={() => this.changeModalQuestionVisibility(false)} animationType='fade'>
                <QuestionSentPopUp changeModalQuestionVisibility={this.changeModalQuestionVisibility}/>
              </Modal>
              <Button block light style={styles.button} onPress={this.onPressButtonDraft.bind(this)}>
                <Text>Salvar como rascunho</Text>
              </Button>
              <Modal transparent={true} visible={this.state.isDraftModalVisible} onRequestClose={() => this.changeModalDraftVisibility(false)} animationType='fade'>
                <DraftPopUp  changeModalDraftVisibility={this.changeModalDraftVisibility}/>
              </Modal>
              <View style={{height: 3}}>
              </View>
          </Form>

         </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3c8dbc",
  },
  image: {
    width: 40,
    height: 40
  },
  button: {
    width: '90%',
    height: 60,
    marginTop: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10
  },
  textTitle: {
    fontSize: 20
  },
  textArea: {
    width: '90%',
    backgroundColor: '#f6f6f6'
  }
});
