import React, { Component } from "react";
import {
  Picker,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  TouchableNativeFeedback
} from "react-native";

import BackHeader from "../components/BackHeader";
import ModalComponent from "../components/ModalComponent";

import { TextInputMask } from "react-native-masked-text";

import styles from "../Styles/Styles";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      cpf: "",
      email: "",
      modalIsVisible: false,
      emailValidation: false,
      message: ""
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
    formdata.append("cpf", this.state.cpf);

    console.log(formdata);

    return fetch("http://sofia.huufma.br/api/check", {
      method: "POST",
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        var message = "";

        console.log(responseJson)

        if (responseJson.message == "success") {
          message =
            "Iremos confirmar os dados fornecidos nas Bases Públicas de Profissionais de Saúde e em alguns minutos lhe enviaremos um email com a confirmação de acesso a Sofia.";
        } else {
          message = "Email e CPF inválidos ou já cadastrados!";
        }

        this.setState({
          message: message
        });

        this.handleOpen();
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleOpen = value => {
    this.setState({ modalIsVisible: true, value: value });
  };

  handleClose = () => {
    this.setState({ modalIsVisible: false });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  checkEmail = () => {
    if (!this.validateEmail(this.state.email)) {
      this.emailValidation = true;
    } else {
      this.emailValidation = false;
    }
  };

  render() {
    const { modalIsVisible } = this.state;

    return (
      <View>
        <BackHeader navigation={this.props.navigation} name="Cadastro" />
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <ScrollView style={{ padding: 20 }}>
          <View>
            <Text style={styles.TextDark}>
              Cadastro somente para Profissionais de Saúde.{"\n"}
              Informe seu CPF e Email para continuar.
            </Text>
          </View>

          <View>
            <Text style={[styles.TextDark, signUpStyles.Label]}>CPF</Text>
            <TextInputMask
              style={styles.Input}
              type={"cpf"}
              options={{}}
              placeholder="000.000.000-00"
              value={this.state.cpf}
              onChangeText={text => {
                this.setState({
                  cpf: text
                });
              }}
              ref={ref => (this.cpfField = ref)}
            />
          </View>
          <View>
            <Text style={[styles.TextDark, signUpStyles.Label]}>E-mail</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="mail@mail.com"
              placeholderTextColor="#999"
              style={[
                styles.Input,
                this.emailValidation && signUpStyles.InputError
              ]}
              value={this.state.email}
              onChangeText={text => {
                this.setState({
                  email: text
                });
                this.checkEmail();
              }}
              ref={ref => (this.emailField = ref)}
            />
            {this.emailValidation && (
              <Text style={signUpStyles.Error}>
                E-mail deve estar no formato "nome@mail.com"
              </Text>
            )}
          </View>

          <TouchableNativeFeedback onPress={() => this.signUp()}>
            <View style={[styles.Button, { marginTop: 40 }]}>
              <Text style={[styles.TextLight, { fontWeight: "bold" }]}>
                Confirmar
              </Text>
            </View>
          </TouchableNativeFeedback>

          {modalIsVisible && (
            <ModalComponent
              handleClose={this.handleClose}
              isModalVisible={this.modalIsVisible}
              content={
                <View>
                  <Text>{this.state.message}</Text>
                </View>
              }
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const signUpStyles = StyleSheet.create({
  Label: {
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10
  },

  InputError: {
    borderColor: "rgba(255, 0, 0, 0.3)"
  },

  Error: {
    marginLeft: 10,
    marginTop: 10,
    color: "rgba(255, 0, 0, 0.6)"
  }
});
