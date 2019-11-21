import React, { Component } from "react";
import { Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import { Icon } from "native-base";

import {Button, Text} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';
import ModalComponent from "../components/ModalComponent";

import logo from '../resources/logo.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalIsVisible: false,
      inputIsVisible: true, 
      icon: "eye-off", 
      isLoggedIn: "false",
      token: ""
    };
  }

  /*Remove header padrão*/
  static navigationOptions = {
    header: null
  };

  /*Aciona a rotina de análise de login*/
  async onLoginButtonPress() {
    const email = this.state.email;
    const password = this.state.password;

    fetch("http://sofia.huufma.br/api/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((res) => {
      /*Quando e-mail ou senha estiverem errados, 
        mostra-se uma mensagem de erro, 
        senão é guardado o token de acesso.*/
      if(res.message == "Não autorizado") {
        this.handleOpen();
      } else {
        this.saveCredentials(res);
      }
      
    })
    .catch((error) => {
        console.debug(error);
    });
  }

  /*Guarda o token de acesso no armazenamento local.*/
  async saveCredentials(res) {
    try {
      await AsyncStorage.setItem("token", res.token);
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
    //this.props.navigation.goBack();
  };

  changePasswordVisibility (){

    console.log(this.state.inputIsVisible)

    this.setState({ 
      icon: this.state.icon === 'eye' ? 'eye-off' : 'eye', 
      inputIsVisible: !this.state.inputIsVisible,  
    }); 
  }

  render() {
    const { modalIsVisible } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == 'ios'}
        style={styles.container}>
        <StatusBar backgroundColor="#3c8dbc" barStyle="dark-content" />
        <View style={styles.header}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.text}>Sofia</Text>
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Digite seu E-mail ou CPF"
          placeholderTextColor="#999"
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <View style={styles.hidePassword}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            style={styles.inputPassword}
            secureTextEntry={this.state.inputIsVisible}
            value={this.state.password}
            ref={input => (this.passwordInput = input)}
            onChangeText={password => this.setState({ password })}
          />
          
          <Icon style={styles.iconPassword} name={this.state.icon} onPress={() => this.changePasswordVisibility()}/>
        </View>
        <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Button transparent onPress={() => {this.props.navigation.navigate("CPF");}}>
          <Text>Cadastrar-se</Text>
        </Button>

        {
          modalIsVisible && 
            <ModalComponent 
              modalIsVisible={this.modalIsVisible} 
              onClose={this.handleClose}
              content={
                <View style={styles.ModalContainer}>
                  <Text style={styles.ModalText}>E-mail ou senha estão incorretos!</Text>
                  <TouchableOpacity onPress={ this.handleClose } style={styles.button}>
                    <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              }
            />
        }

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFF',
    padding: 30,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 100,
  },

  logo: {
    width: 100,
    height: 100,
  },

  text: {
    color: "black",
    marginTop: 20,
    width: 200,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 50
  },

  input: {
    height: 46,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  hidePassword: {
    flexDirection: 'row',
    height: 46,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  iconPassword: {
    paddingTop: 7,
  },

  inputPassword: {
    flex: 1
  },

  button: {
    height: 46,
    backgroundColor: '#3c8dbc',
    borderRadius: 4,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent:'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

})



