import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";
import { TextInputMask } from 'react-native-masked-text' 

import BackHeader from "../components/BackHeader";

export default class SignUp extends Component {
  constructor() {
    super();
    
  }

  componentDidMount() {
      const solicitante = this.props.navigation.state.params.solicitante;

      this.state = {
        solicitante: solicitante,
      };

      console.log(this.state);
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  render() {
    return (
        <View>
            <BackHeader navigation={this.props.navigation} name="Cadastro"/>
            <StatusBar backgroundColor="#3c8dbc" barStyle="dark-content" />

            <ScrollView style={styles.container}>

                <View>
                    <Text style={styles.text}>Núcleo</Text>
                    <Picker style={styles.picker} onValueChange={() => {}}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
                </View>

                <View>
                    <Text style={styles.text}>Cidade</Text>
                    <Picker style={styles.picker} onValueChange={() => {}}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.text}>Unidade</Text>
                    <Picker style={styles.picker} onValueChange={() => {}}>
                        <Picker.Item label="Selecione..." value="exemplo" />
                        <Picker.Item label="Exemplo1" value="exemplo" />
                        <Picker.Item label="Exemplo2" value="exemplo" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.text}>Equipe</Text>
                    <Picker style={styles.picker} onValueChange={() => {}}>
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
                    onChangeText={email => this.setState({ nome })}
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
                    <Picker style={styles.picker} onValueChange={() => {}}>
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
                    onChangeText={email => this.setState({ nome })}
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
                    onChangeText={email => this.setState({ nome })}
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
                    onChangeText={email => this.setState({ nome })}
                    onSubmitEditing={() => {}}
                    />
                </View>
            
                <TouchableOpacity onPress={() => {}} style={styles.button}>
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



