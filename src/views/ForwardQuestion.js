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
      PickerValueHolder: ""
    };
  }

  componentDidMount() {
    this.getCBOList();
  }

  async forwardPacientData() {
    var token = await AsyncStorage.getItem("token");

    let formdata = new FormData();

    formdata.append("token", token);
    formdata.append("cpf", "27132560387");

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
          cpf: person.cpf,
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
      <View style={{ backgroundColor: "#FFF" }}>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />

        <ScrollView>
          <View style={localStyles.Container}>
            <View>
              <Text style={localStyles.Text}>
                Encaminhamento de paciente em nova solicitação. {"\n"}
              </Text>
            </View>

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

            <View>
              <Text style={localStyles.Text}>CPF</Text>
              <TextInput
                style={localStyles.Input}
                value={this.state.cpf}
                editable={false}
              />
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
    marginLeft: 37,
    marginRight: 37
  },

  Text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    color: "#202020",
    marginTop: 10
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
  }
});
