import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  StyleSheet
} from "react-native";

import { Button, Text } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

import login from "../services/Solicitant";

import styles from "../Styles/Styles";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginHeader from "../components/LoginHeader";
import ModalComponent from "../components/ModalComponent";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: "false",
      token: "",
      isModalVisible: false
    };
  }

  /*Remove header padrão*/
  static navigationOptions = {
    header: null
  };

  /*Aciona a rotina de análise de login. 
    Se tudo certo, redireciona o solicitante para a página inicial,
    senão, mostra uma mensagem de erro.*/
  onLoginButtonPress = async () => {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email);

    login(email, password)
      .then(response => {
        const { token, message } = response;

        this.saveCredentials(token);
      })
      .catch(response => {
        this.handleOpen();
      });
  };

  /*Guarda o token de acesso no armazenamento local.*/
  saveCredentials = async token => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("logging", "true");

      this.props.navigation.navigate("HomeScreen");
    } catch (error) {
      console.debug(error);
    }
  };

  /*Abre o modal*/
  handleOpen = value => {
    this.setState({ modalIsVisible: true, value: value });
  };

  /*Fecha o modal*/
  handleClose = () => {
    this.setState({ modalIsVisible: false });
  };

  render() {
    const { modalIsVisible } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == "ios"}
        style={styles.Container}
      >
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <LoginHeader />

        <EmailInput props={this} />

        <PasswordInput props={this} />

        <TouchableNativeFeedback onPress={this.onLoginButtonPress.bind(this)}>
          <View
            style={[
              styles.Button,
              { backgroundColor: "#3c8dbc", marginTop: 20 }
            ]}
          >
            <Text style={[styles.TextLight, { fontWeight: "600" }]}>
              Entrar
            </Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#2c6689" }}>Cadastrar-se</Text>
        </TouchableOpacity>

        {modalIsVisible && (
          <ModalComponent
            handleClose={this.handleClose}
            isModalVisible={this.modalIsVisible}
            content={
              <View>
                <Text>E-mail ou senha incorretos!</Text>
              </View>
            }
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}
