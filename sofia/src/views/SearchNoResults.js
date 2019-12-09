import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View
} from "react-native";
import { Icon } from "native-base";

import styles from "../Styles/Styles";

export default class SearchNoResults extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const question = this.props.navigation.state.params.question;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

    return (
      <View style={searchNoReStyles.Container}>
        <Text style={styles.Title}>
          Não foi encontrada nenhuma pergunta relacionada a sua dúvida na nossa
          base.
        </Text>
        <View style={searchNoReStyles.ButtonContainer}>
          <TouchablePlatformSpecific
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
          </TouchablePlatformSpecific>
          <TouchablePlatformSpecific
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
          </TouchablePlatformSpecific>
        </View>
      </View>
    );
  }
}

const height = Dimensions.get("window").height;

const searchNoReStyles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    justifyContent: "space-around"
  },

  ButtonContainer: {
    height: height * 0.4,
    alignItems: "center"
  }
});
