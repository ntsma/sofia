import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Success extends Component {
  /*Remove header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
    return (
      <View style={styles.Container}>
        <Text style={styles.Title}>
          Sua pergunta já foi enviada para nossos teleconsultores. A partir de
          agora, ela será respondida em até 72 horas.{"\n\n"}Fique atento ao
          aplicativo!
        </Text>
        <View style={styles.ButtonContainer}>
          <View style={{ width: "100%" }}>
            <TouchablePlatformSpecific
              onPress={() => {
                this.props.navigation.navigate("Search", { isConected: true });
              }}
            >
              <View style={styles.Button}>
                <Icon name="search" style={[styles.Icon, { color: "#FFF" }]} />
                <Text style={styles.TextLight}>
                  Possui outra dúvida?{"\n"}Faça uma nova pergunta
                </Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
          <View style={{ width: "100%" }}>
            <TouchablePlatformSpecific
              onPress={() => {
                this.props.navigation.navigate("HomeScreen", {
                  shouldUpdate: true
                });
              }}
            >
              <View style={styles.Button}>
                <Icon name="apps" style={[styles.Icon, { color: "#FFF" }]} />
                <Text style={styles.TextLight}>Retornar ao menu principal</Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
        </View>
      </View>
    );
  }
}

const height = Dimensions.get("window").height;

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
    width: "100%",
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
