import React, { Component } from "react";
import {
  Picker,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TextInput,
  View,
  Alert
} from "react-native";

import { TextInputMask } from "react-native-masked-text";

import styles from "../Styles/Styles";

import AsyncStorage from "@react-native-community/async-storage";
import { getCBO, sendForwardRequest } from "../services/Request";
import NetInfo from "@react-native-community/netinfo";
import ModalComponent from "../components/ModalComponent";

export default class ForwardQuestion extends Component {
  constructor() {
    super();
    this.state = {
      cpf: "",
      cnes: "",
      nome: "",
      data_nasc: "",
      sexo: "",
      nome_mae: "",
      data: [],
      cboValue: "",
      willForward: "off",
      checkWillForward: false,
      wasRequested: "off",
      checkWasRequested: false,
      question: "",
      patientId: "",
      file_ids: "",
      CPFInvalid: false,
      modalIsVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.navigation.state.params.question,
      file_ids: this.props.navigation.state.params.file_ids
    });

    this.getCBOList();
  }

  getCBOList = async () => {
    const token = await AsyncStorage.getItem("token");

    getCBO(token)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCBOCode(cbo) {
    var code = 0;

    this.state.data.forEach(element => {
      if (cbo == element.description) {
        code = element.code;
      }
    });

    return code;
  }

  getCPFRaw(cpf) {
    return cpf
      .split("")
      .filter(n => Number(n) || n == false)
      .join("");
  }

  validateCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  async forwardPacientData() {
    if (!this.validateCPF(this.getCPFRaw(this.state.cpf))) {
      this.setState({ CPFInvalid: true });
      return false;
    } else {
      this.setState({ CPFInvalid: false });
    }

    var token = await AsyncStorage.getItem("token");

    let formdata = new FormData();

    formdata.append("token", token);
    formdata.append("cpf", this.getCPFRaw(this.state.cpf));

    return fetch("http://sofia.huufma.br/api/patient/find", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        var patient = responseJson.data.patient;
        var person = responseJson.data.person;

        this.setState({
          cnes: patient.cns,
          nome: person.name,
          data_nasc: person.birthday,
          sexo: person.sex,
          nome_mae: patient.mother_name,
          patientId: person.cpf
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async onCreateForwardQuestion() {
    if (!this.validateCPF(this.getCPFRaw(this.state.cpf))) {
      this.handleOpen();
      this.setState({ CPFInvalid: true });
      return false;
    } else {
      this.setState({ CPFInvalid: false });
    }

    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;
    var cboCode = this.getCBOCode(this.state.cboValue);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        sendForwardRequest(
          token,
          question,
          this.state.file_ids,
          this.state.patientId,
          this.state.willForward,
          this.state.wasRequested,
          cboCode
        )
          .then(response => {
            this.setState({
              question: "",
              file_ids: "",
              patientId: "",
              willForward: "off",
              checkWillForward: false,
              wasRequested: "off",
              checkWasRequested: false
            });

            shouldUpdate = true;
            this.props.navigation.navigate("Success", { shouldUpdate });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  handleOpen = () => {
    this.setState({ modalIsVisible: true });
  };

  handleClose = () => {
    this.setState({ modalIsVisible: false });
  };

  render() {
    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <ScrollView>
          <View style={localStyles.Container}>
            <View style={localStyles.Box}>
              <Text style={[localStyles.Text, localStyles.Title]}>
                Solicitação
              </Text>
              <Text style={[localStyles.Text, localStyles.Question]}>
                "{this.state.question}"
              </Text>
            </View>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={localStyles.Text}>Dados do paciente</Text>
            </View>

            <View>
              <Text style={localStyles.Text}>CPF</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TextInputMask
                  style={[styles.Input, { width: "80%" }]}
                  type={"cpf"}
                  placeholder="000.000.000-00"
                  value={this.state.cpf}
                  onChangeText={text => {
                    this.setState({
                      cpf: text
                    });
                  }}
                />
                <TouchablePlatformSpecific
                  onPress={() => this.forwardPacientData()}
                >
                  <View
                    style={[
                      styles.Button,
                      {
                        width: "18%",
                        marginTop: 20,
                        height: 44,
                        marginBottom: 0
                      }
                    ]}
                  >
                    <Text style={[styles.TextLight, { fontWeight: "bold" }]}>
                      ok
                    </Text>
                  </View>
                </TouchablePlatformSpecific>
              </View>
            </View>
            {this.state.CPFInvalid && (
              <Text style={{ marginTop: 5, marginLeft: 10, color: "#c93232" }}>
                Insira um CPF válido.
              </Text>
            )}
            <View>
              <Text style={localStyles.Text}>CNES</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.cnes}
                editable={false}
              />
            </View>

            <View>
              <Text style={localStyles.Text}>Nome</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.nome}
                editable={false}
              />
            </View>

            <View>
              <Text style={localStyles.Text}>Data de Nascimento</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.data_nasc}
                editable={false}
              />
            </View>

            <View>
              <Text style={localStyles.Text}>Sexo</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.sexo}
                editable={false}
              />
            </View>

            <View>
              <Text style={localStyles.Text}>Nome da mãe</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.nome_mae}
                editable={false}
              />
            </View>

            <View>
              <Text style={localStyles.Text}>
                Há inteção de encaminhamento?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20
                }}
              >
                <TouchablePlatformSpecific
                  onPress={() =>
                    this.setState({ willForward: "on", checkWillForward: true })
                  }
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.checkWillForward
                        ? localStyles.Selected
                        : localStyles.Unselected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.checkWillForward
                          ? localStyles.TextSelected
                          : localStyles.TextUnselected
                      ]}
                    >
                      Sim
                    </Text>
                  </View>
                </TouchablePlatformSpecific>

                <TouchablePlatformSpecific
                  onPress={() =>
                    this.setState({
                      willForward: "off",
                      checkWillForward: false
                    })
                  }
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.checkWillForward
                        ? localStyles.Unselected
                        : localStyles.Selected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.checkWillForward
                          ? localStyles.TextUnselected
                          : localStyles.TextSelected
                      ]}
                    >
                      Não
                    </Text>
                  </View>
                </TouchablePlatformSpecific>
              </View>
            </View>

            {this.state.checkWillForward && (
              <View>
                <Text style={localStyles.Text}>Especialidade solicitada</Text>
                <Picker
                  style={localStyles.Picker}
                  selectedValue={this.state.cboValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ cboValue: itemValue })
                  }
                >
                  {this.state.data.map((item, key) => (
                    <Picker.Item
                      label={item.description}
                      value={item.description}
                      key={key}
                    />
                  ))}
                </Picker>
              </View>
            )}

            <View>
              <Text style={localStyles.Text}>
                Encaminhamento já solicitado?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20
                }}
              >
                <TouchablePlatformSpecific
                  onPress={() =>
                    this.setState({
                      wasRequested: "on",
                      checkWasRequested: true
                    })
                  }
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.checkWasRequested
                        ? localStyles.Selected
                        : localStyles.Unselected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.checkWasRequested
                          ? localStyles.TextSelected
                          : localStyles.TextUnselected
                      ]}
                    >
                      Sim
                    </Text>
                  </View>
                </TouchablePlatformSpecific>

                <TouchablePlatformSpecific
                  onPress={() =>
                    this.setState({
                      wasRequested: "off",
                      checkWasRequested: false
                    })
                  }
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.checkWasRequested
                        ? localStyles.Unselected
                        : localStyles.Selected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.checkWasRequested
                          ? localStyles.TextUnselected
                          : localStyles.TextSelected
                      ]}
                    >
                      Não
                    </Text>
                  </View>
                </TouchablePlatformSpecific>
              </View>
            </View>

            <TouchablePlatformSpecific
              onPress={() => this.onCreateForwardQuestion()}
            >
              <View style={[styles.Button, { marginTop: 40 }]}>
                <Text style={[styles.TextLight, { fontWeight: "bold" }]}>
                  Enviar
                </Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
        </ScrollView>

        {this.state.modalIsVisible && (
          <ModalComponent
            handleClose={this.handleClose}
            isModalVisible={this.modalIsVisible}
            content={
              <View>
                <Text style={{color: "#202020"}}>Insira um CPF válido.</Text>
              </View>
            }
          />
        )}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  Container: {
    marginTop: 20,
    marginLeft: 27,
    marginRight: 27
  },

  Box: {
    borderWidth: 2,
    borderColor: "#3c8dbc80",
    borderStyle: "solid",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },

  Text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    color: "#202020",
    marginTop: 10
  },

  Title: {
    position: "absolute",
    top: -22,
    left: 8,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10
  },

  Question: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },

  Input: {
    flexDirection: "row",
    height: 46,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "#e4e4e4",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15,
    color: "#454545"
  },

  Selected: {
    width: "40%",
    backgroundColor: "#3c8dbc"
  },

  Unselected: {
    width: "40%",
    backgroundColor: "#EEE"
  },

  TextSelected: {
    color: "#FFF",
    fontWeight: "bold"
  },

  TextUnselected: {
    color: "#3c8dbc",
    fontWeight: "bold"
  }
});
