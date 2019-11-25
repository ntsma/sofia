import React, { Component } from "react";
import { Image, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, View } from "react-native";

import { Button, Text } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

import ModalComponent from '../components/ModalComponent';
import login from '../services/Solicitant';
import styles from '../config/Login';

import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import LoginHeader from '../components/LoginHeader';
import InvalidEmailOrPasswordModal from '../components/modals/InvalidEmailOrPasswordModal';

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

    login(email, password).then(response => {
      const {token, message} = response;

      this.saveCredentials(token);

    }).catch(response => {
      this.handleOpen();
    })
  
  }

  /*Guarda o token de acesso no armazenamento local.*/
  saveCredentials = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("logging", "true");

      this.props.navigation.navigate("HomeScreen");

    } catch (error) {
      console.debug(error);
    }
  };

  /*Abre o modal*/
  handleOpen = (value) => {
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
        enabled={Platform.OS == 'ios'}
        style={styles.container}>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />
        
        <LoginHeader />

        <EmailInput props={this} />

        <PasswordInput props={this} />

        <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Button transparent onPress={() => {this.props.navigation.navigate("CPF");}}>
          <Text>Cadastrar-se</Text>
        </Button>

        { modalIsVisible && <InvalidEmailOrPasswordModal handleClose={this.handleClose} /> }

      </KeyboardAvoidingView>
    );
  }
};