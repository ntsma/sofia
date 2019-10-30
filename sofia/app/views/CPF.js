import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";

import BackHeader from "../components/BackHeader";
import AsyncStorage from '@react-native-community/async-storage';

import { TextInputMask } from 'react-native-masked-text';

export default class CPF extends Component {
  constructor() {
    super();
    this.state = {
        cpf: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  async getSolicitante() {
    var token = await AsyncStorage.getItem("token");

    const cpf = this.state.cpf;

    return fetch("http://35.202.173.125/mothers", {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        solicitante = {
          "nucleo": "Núcleo de Telessaúde do Maranhão",
          "cidade": "São Luís",
          "unidade": "Unidade 1",
          "equipe": "Equipe 1",
          "nome": "Eduardo S Vieira",
          "cpf": "610490006313",
          "telefone": "98992043959",
          "nascimento": "04/09/1997",
          "sexo": "Masculino",
          "email": "eduardo@example.com",
          "profissao": "TI",
          "cargo": "Programador"
        };

        this.props.navigation.navigate("SignUp", {solicitante})
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    return (
        <View>
            <BackHeader navigation={this.props.navigation} name="Cadastro"/>
            <StatusBar backgroundColor="#3c8dbc" barStyle="dark-content" />

            <ScrollView style={styles.container}>
              <View>
                  <Text style={styles.text}>CPF</Text>
                  <TextInputMask
                  style={styles.input}
                  type={'cpf'}
                  options={{}}
                  placeholder="123.456.789-00"
                  value={this.state.cpf}
                  onChangeText={text => {
                      this.setState({
                      cpf: text
                      })
                  }}
                  ref={(ref) => this.cpfField = ref}
                  />
                </View>
                
                <TouchableOpacity onPress={ this.getSolicitante.bind(this) } style={styles.button}>
                    <Text style={styles.buttonText}>Consultar</Text>
                </TouchableOpacity>
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

})



