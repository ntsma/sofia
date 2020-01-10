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
import { Icon, Textarea } from "native-base";

import ModalComponent from "../components/ModalComponent";
import styles from "../Styles/Styles";

import AsyncStorage from "@react-native-community/async-storage";
import { getCBO } from "../services/Request";

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
      modalIsVisible: false,
      data: [],
      PickerValueHolder: "",
      isEspecialidade: false,
      isSolicitado: false,
      question: ""
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.navigation.state.params.question
    });

    this.getCBOList();
  }

  getCPF(cpf) {
    return cpf
      .split("")
      .filter(n => Number(n) || n == false)
      .join("");
  }

  async forwardPacientData() {
    var token = await AsyncStorage.getItem("token");

    let formdata = new FormData();

    formdata.append("token", token);
    formdata.append("cpf", this.getCPF(this.state.cpf));

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

        console.log(responseJson);

        this.setState({
          cnes: patient.cns,
          nome: person.name,
          data_nasc: person.birthday,
          sexo: person.sex,
          nome_mae: patient.mother_name
        });
      })
      .catch(error => {
        console.log(error);
      });
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

  async onCreateForwardQuestion() {
    var token = await AsyncStorage.getItem("token");
    var question = this.state.question;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Requests.sendRequest(token, question, this.state.file_ids, true, this.state.isEspecialidade, this.state.isSolicitado, this.state.cbo)
          .then(response => {
            this.setState({
              question: ""
            });

            shouldUpdate = true;
            this.props.navigation.navigate("Success", { shouldUpdate });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.saveDraftIntoAsyncStorage({
          id: this.state.question.length + 1,
          description: question,
          file_ids: this.state.file_ids
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
    const { modalIsVisible } = this.state;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <ScrollView>
          <View style={localStyles.Container}>
            <View style={localStyles.Box}>
              <Text style={[localStyles.Text, localStyles.Title]}>Solicitação</Text>
              <Text style={[localStyles.Text, localStyles.Question]}>"{this.state.question}"</Text>
            </View>

            <View>
              <Text style={localStyles.Text}>
                Encaminhamento de paciente em nova solicitação. {"\n"}
              </Text>
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
                  onPress={() => this.setState({ isEspecialidade: true })}
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.isEspecialidade
                        ? localStyles.Selected
                        : localStyles.Unselected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.isEspecialidade
                          ? localStyles.TextSelected
                          : localStyles.TextUnselected
                      ]}
                    >
                      Sim
                    </Text>
                  </View>
                </TouchablePlatformSpecific>

                <TouchablePlatformSpecific
                  onPress={() => this.setState({ isEspecialidade: false })}
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.isEspecialidade
                        ? localStyles.Unselected
                        : localStyles.Selected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.isEspecialidade
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

            {this.state.isEspecialidade && (
              <View>
                <Text style={localStyles.Text}>Especialidade solicitada</Text>
                <Picker
                  style={localStyles.Picker}
                  selectedValue={this.state.PickerValueHolder}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ PickerValueHolder: itemValue })
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
                  onPress={() => this.setState({ isSolicitado: true })}
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.isSolicitado
                        ? localStyles.Selected
                        : localStyles.Unselected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.isSolicitado
                          ? localStyles.TextSelected
                          : localStyles.TextUnselected
                      ]}
                    >
                      Sim
                    </Text>
                  </View>
                </TouchablePlatformSpecific>

                <TouchablePlatformSpecific
                  onPress={() => this.setState({ isSolicitado: false })}
                >
                  <View
                    style={[
                      styles.Button,
                      this.state.isSolicitado
                        ? localStyles.Unselected
                        : localStyles.Selected
                    ]}
                  >
                    <Text
                      style={[
                        styles.TextLight,
                        this.state.isSolicitado
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
              onPress={() => this.forwardPacientData()}
            >
              <View style={[styles.Button, { marginTop: 40 }]}>
                <Text style={[styles.TextLight, { fontWeight: "bold" }]}>
                  Confirmar
                </Text>
              </View>
            </TouchablePlatformSpecific>

            {modalIsVisible && (
              <ModalComponent
                handleClose={this.handleClose}
                isModalVisible={this.modalIsVisible}
                content={
                  <View>
                    <Text>Sucesso!</Text>
                  </View>
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const signUpStyles = StyleSheet.create({
  Label: {
    textAlign: "left",
    marginTop: 10
  }
});

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
