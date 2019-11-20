import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";

import BackHeader from "../components/BackHeader";
import ModalComponent from "../components/ModalComponent";
import AsyncStorage from '@react-native-community/async-storage';

import { TextInputMask } from 'react-native-masked-text';

export default class CPF extends Component {
  constructor() {
    super();
    this.state = {
        cpf: "",
        email: "",
        isVisible: false,
        emailValidation: false,
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  signUp() {
    console.log(this.state);

    let formdata = new FormData();

    formdata.append("email", this.state.email);
    formdata.append("cpf", "61049006313");

    console.log(formdata)
    
    return fetch('http://sofia.huufma.br/api/check', {
        method: 'POST',
        body: formdata,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
        
      });

  }

  async getSolicitante() {
    var token = await AsyncStorage.getItem("token");

    const cpf = this.state.cpf;
    const email = this.state.email;

    return fetch("http://35.202.173.125/mothers", {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        solicitante = {
          "cidade": "São Luís",
          "unidade": "Unidade 1",
          "equipe": "Equipe 1",
          "nome": "Eduardo S Vieira",
          "cpf": cpf,
        };

        this.props.navigation.navigate("SignUp", {solicitante})
      })
      .catch((error) => {
        console.error(error);
      });

  }

  handleOpen = value => {
    this.setState({ isVisible: true, value: value });
  };

  handleClose = () => {
    this.setState({ isVisible: false });
    this.props.navigation.goBack();
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  checkEmail = () => {
    if (!this.validateEmail(this.state.email)) {
      this.emailValidation = true;
    } else {
      this.emailValidation = false;
    }
  }

  render() {

    const { isVisible } = this.state;

    return (
        <View>
            <BackHeader navigation={this.props.navigation} name="Cadastro"/>
            <StatusBar backgroundColor="#3c8dbc" barStyle="dark-content" />

            <ScrollView style={styles.container}>

              <View>
                <Text style={{textAlign: 'center'}}>
                  Cadastro somente para Profissionais de Saúde.{"\n"}
                  Informe seu CPF e Email para continuar. 
                </Text>
              </View>

              <View>
                <Text style={styles.text}>CPF</Text>
                <TextInputMask
                  style={styles.input}
                  type={'cpf'}
                  options={{}}
                  placeholder="000.000.000-00"
                  value={this.state.cpf}
                  onChangeText={text => {
                    this.setState({
                    cpf: text
                    })
                  }}
                  ref={(ref) => this.cpfField = ref}
                />
              </View>
                <View>
                  <Text style={styles.text}>E-mail</Text>
                    <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    placeholder="mail@mail.com"
                    placeholderTextColor="#999"
                    style={[styles.input, this.emailValidation && styles.inputError]}
                    value={this.state.email}
                    onChangeText={text => {
                      this.setState({ 
                        email: text 
                      });
                      this.checkEmail();
                    }}
                    ref={(ref) => this.emailField = ref}
                    />
                    {this.emailValidation && <Text style={styles.error}>E-mail deve estar no formato "nome@mail.com"</Text>}
                </View>
                
                {/* <TouchableOpacity onPress={ this.getSolicitante.bind(this) } style={styles.button}></TouchableOpacity> */}
                <TouchableOpacity onPress={ () => this.signUp() } style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>

                {
                  isVisible && 
                  <View>
                    <ModalComponent 
                    isVisible={this.isVisible} 
                    onClose={this.handleClose}
                    content={
                      <View style={styles.ModalContainer}>
                        <Text style={styles.ModalText}>Iremos confirmar os dados fornecidos nas
                        Bases Públicas de Profissionais de Saúde e em alguns minutos lhe 
                        enviaremos um email para ({this.state.email}) com a confirmação de
                        acesso a Sofia.</Text>
                      </View>
                    }
                  />
                  <TouchableOpacity onPress={ () => this.signUp() } style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                  </TouchableOpacity>
                  </View>
                }

            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  text: {
    color: "#222",
    fontWeight: "600",
    paddingTop: 10,
  },

  input: {
    height: 46,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15,
  },

  inputError: {
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },

  picker: {
      color: "#999",
  },

  button: {
    height: 46,
    backgroundColor: '#3c8dbc',
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 100,
    alignSelf: 'stretch',
    justifyContent:'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  ModalContainer: { 
    paddingLeft: 20, 
    paddingRight: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  ModalText: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#555', 
    textAlign: 'center', 
    
  },

  error: {
    marginLeft: 10,
    marginTop: 10,
    color: 'rgba(255, 0, 0, 0.6)',
  }

})



