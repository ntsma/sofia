import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";

import { StatusBar } from "react-native";
import { Header, Button, Icon } from "native-base";

export default class Success extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    return (        
        <View style={styles.Container}>
        
          <Text style={styles.Title}>
            Sua pergunta já foi enviada para nossos teleconsultores. A partir de
            agora, ela será respondida em até 72 horas.{"\n\n"}Fique atento ao
            aplicativo!
          </Text>
          <View style={styles.ButtonContainer}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="search"
                />
                <Text style={styles.TextLight}>
                  Possui outra dúvida?{"\n"}Faça uma nova pergunta
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate("HomeScreen", {shouldUpdate: true})}
            >
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="apps"
                />
                <Text style={styles.TextLight}>Retornar ao menu principal</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

    );
  }
}

const height = Dimensions.get("window").height;

const header = StyleSheet.create({
  background: {
    backgroundColor: '#3c8dbc',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 37,
  },

  button: {
    backgroundColor: '#3c8dbc',
    width: 50,
  },

  icon: {
    width: 37,
    color: '#FFF',
    fontSize: 25,
    marginRight: 17,
    marginLeft: 20,
    textAlign: 'center',
  },

  text: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
  },

});


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    justifyContent: "space-around"
  },

  Title: {
    fontSize: 18
  },

  ButtonContainer: {
    height: height * 0.5,
    alignItems: "center"
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#3c8dbc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  Icon: {
    position: "absolute",
    left: 20,
    color: "#202020",
    fontSize: 24
  },

  TextLight: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  }
});
