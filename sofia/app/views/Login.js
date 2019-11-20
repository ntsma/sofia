import React, { Component } from "react";
import { Alert, AppRegistry, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";
import { Icon } from "native-base"

import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigator } from "react-navigation";

import logo from '../resources/logo.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      visible: true, 
      icon: "eye-off", 
      logging: "false",
      token: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  changePasswordVisibility (){

    console.log(this.state.visible)

    this.setState({ 
      icon: this.state.icon === 'eye' ? 'eye-off' : 'eye', 
      visible: !this.state.visible,  
    }); 
  }
  
  async login(responseJson) {
    try {
      await AsyncStorage.setItem("token", responseJson.token);
      await AsyncStorage.setItem("logging", "true");

      const t = await AsyncStorage.getItem("logging");

      this.setState({
        logging: "true",
        token: t
      })

      console.debug("TOKEN")
      console.debug(this.state.token);

      this.props.navigation.navigate("HomeScreen");

    } catch (error) {
      console.debug(error);
    }
  };

  async onLoginPress() {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email);
    console.log(password);

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
          .then((responseJson) => {
            this.login(responseJson);
          })
          .catch((error) => {
             console.log("Houve um problema!")
             console.debug(error);
          });
  }

  render() {
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
            secureTextEntry={this.state.visible}
            value={this.state.password}
            ref={input => (this.passwordInput = input)}
            onChangeText={password => this.setState({ password })}
          />
          
          <Icon style={styles.iconPassword} name={this.state.icon} onPress={() => this.changePasswordVisibility()}/>
        </View>
        <TouchableOpacity onPress={this.onLoginPress.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("CPF");}} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> 
        
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



