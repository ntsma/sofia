import React, { Component } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import login from "../services/Solicitant";

import styles from "../Styles/Styles";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import ModalComponent from "../components/ModalComponent";

import logo from "../resources/SOFIA.png";

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

    login(email, password)
      .then(response => {
        const { token, forwards_indications } = response;

        this.saveCredentials(token, forwards_indications);
      })
      .catch(response => {
        this.handleOpen();
      });
  };

  /*Guarda o token de acesso no armazenamento local.*/
  saveCredentials = async (token, forwards_indications) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("logging", "true");
      await AsyncStorage.setItem(
        "forwards_indications",
        forwards_indications.toString()
      );

      console.log("ENCAMINHAMENTO ------------");
      console.log(await AsyncStorage.getItem("forwards_indications"));

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

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == "ios"}
        style={styles.Container}
      > 
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <View style={styles.loginLogoContainer}>
          <Image style={styles.loginLogo} source={logo} />
        </View>

        <EmailInput props={this} />

        <PasswordInput props={this} />

        <View style={{ width: "100%" }}>
          <TouchablePlatformSpecific
            onPress={this.onLoginButtonPress.bind(this)}
          >
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
          </TouchablePlatformSpecific>
        </View>

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
