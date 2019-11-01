import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";
import { TextInputMask } from 'react-native-masked-text' 

import BackHeader from "../components/BackHeader";

export default class SignUp extends Component {
  constructor() {
    super();

    this.state = {
        cpf: "",
        phone: "",
        dt: "",
        nome: "",
        nucleo: "",
        cidade: "",
        unidade: "",
        equipe: "",
        sexo: "",
        email: "",
        profissao: "",
        cargo: ""
    };
    
  }

  componentDidMount() {
      const solicitante = this.props.navigation.state.params.solicitante;

      this.setState({
          cpf: solicitante.cpf,
          phone: solicitante.telefone,
          dt: solicitante.nascimento
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
                    <Text style={styles.text}>Núcleo</Text>
                    <Picker selectedValue={this.state.nucleo} style={styles.picker} onValueChange={nucleo => this.setState({ nucleo })}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
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
                    <Text style={styles.text}>Telefone</Text>
                    <TextInputMask
                    style={styles.input}
                    placeholder="(99) 9 9999 - 9999"
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                      }}
                    value={this.state.phone}
                    onChangeText={text => {
                        this.setState({
                        phone: text
                        })
                    }}
                    ref={(ref) => this.phoneField = ref}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Data de Nascimento</Text>
                    <TextInputMask
                    style={styles.input}
                    placeholder="11/11/1999"
                    type={'datetime'}
                    options={{
                        format: 'MM/DD/AAAA'
                    }}
                    value={this.state.dt}
                    onChangeText={text => {
                        this.setState({
                        dt: text
                        })
                    }}
                    ref={(ref) => this.dtField = ref}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Sexo</Text>
                    <Picker selectedValue={this.state.sexo} style={styles.picker} onValueChange={sexo => this.setState({ sexo })}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Masculino" value="masculino" />
                        <Picker.Item label="Feminino" value="feminino" />
                    </Picker>
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
                    style={styles.input}
                    value={this.props.teste}
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={() => {}}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Profissão</Text>
                    <TextInput
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder="Digite sua profissão"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.props.teste}
                    onChangeText={profissao => this.setState({ profissao })}
                    onSubmitEditing={() => {}}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Cargo</Text>
                    <TextInput
                    keyboardType="default"
                    returnKeyType="done"
                    placeholder="Digite seu cargo"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.props.teste}
                    onChangeText={cargo => this.setState({ cargo })}
                    onSubmitEditing={() => {}}
                    />
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



