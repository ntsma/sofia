import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";
import { TextInputMask } from 'react-native-masked-text' 

import BackHeader from "../components/BackHeader";

export default class SignUp extends Component {

  constructor() {
    super();

    this.state = {
        nome: "",
        cpf: "",
        cidade: "",
        unidade: "",
        equipe: "",
    };

  }

  componentDidMount() {
      const solicitante = this.props.navigation.state.params.solicitante;

      this.setState({
          cpf: solicitante.cpf,
      })
  }

  static navigationOptions = {
    header: null
  };

  signUp() {
    console.log(this.state);

    let formdata = new FormData();

    formdata.append("type_id", 52);
    
    return fetch('http://sofia.huufma.br/api/solicitation/' + 10, {
        method: 'POST',
        body: formdata,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.props.navigation.navigate("Login");
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
                    <Text style={styles.text}>Nome</Text>
                    <TextInput
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder="Digite seu nome"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.props.teste}
                    onChangeText={nome => this.setState({ nome })}
                    onSubmitEditing={() => {}}
                    />
                </View>
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

                <View>
                    <Text style={styles.text}>Cidade</Text>
                    <Picker selectedValue={this.state.cidade} style={styles.picker} onValueChange={cidade => this.setState({ cidade })}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo1" />
                        <Picker.Item label="Exemplo2" value="exemplo2" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.text}>Unidade</Text>
                    <Picker selectedValue={this.state.unidade} style={styles.picker} onValueChange={unidade => this.setState({ unidade })}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.text}>Equipe</Text>
                    <Picker selectedValue={this.state.equipe} style={styles.picker} onValueChange={equipe => this.setState({ equipe })}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
                </View>
            
                <TouchableOpacity onPress={this.signUp.bind(this) } style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50
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



