import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Icon } from "native-base";

export default class SearchNoResults extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const question = this.props.navigation.state.params.question;

    return (
      <View style={styles.Container}>
        <Text style={styles.Title}>
          Não foi encontrada nenhuma pergunta relacionada a sua dúvida na nossa
          base.
        </Text>
        <View style={styles.ButtonContainer}>
          <TouchableNativeFeedback
            onPress={() => {
              this.props.navigation.navigate("Search", { isConected: true });
            }}
          >
            <View style={styles.Button}>
              <Icon
                style={[styles.Icon, { color: "#FFF" }]}
                type="MaterialIcons"
                name="search"
              />
              <Text style={styles.TextLight}>Faça uma nova pergunta</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() =>
              this.props.navigation.navigate("Question", { question })
            }
          >
            <View style={styles.Button}>
              <Icon
                style={[styles.Icon, { color: "#FFF" }]}
                type="MaterialIcons"
                name="launch"
              />
              <Text style={styles.TextLight}>Prosseguir com a solicitação</Text>
            </View>
          </TouchableNativeFeedback>
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
    height: height * 0.4,
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
