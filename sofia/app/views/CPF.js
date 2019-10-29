import React, { Component } from "react";
import { Picker, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput, Text, View } from "react-native";

import BackHeader from "../components/BackHeader";

export default class CPF extends Component {
  constructor() {
    super();
    this.state = {
        teste: ""
    };
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
                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                    keyboardType="number-pad"
                    returnKeyType="next"
                    placeholder="000.000.000-00"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.props.teste}
                    onChangeText={email => this.setState({ nome })}
                    onSubmitEditing={() => {}}
                    />
                </View>
                
                <TouchableOpacity onPress={() => {}} style={styles.button}>
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



