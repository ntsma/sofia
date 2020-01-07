/*CanceledIssue.js*/
import React, { Component } from "react";

import { ThemeProvider, Card } from "react-native-elements";

import {
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View,
  Dimensions,
  StyleSheet
} from "react-native";
import { Icon } from "native-base";

export default class ShowObservation extends Component {
  render() {
    const item = this.props.navigation.state.params.item;
    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;
    return (
      <View style={{ flex: 1 }}>
        <Card title="Observação">
          <Text style={{ marginBottom: 150 }}>
            {
              this.props.navigation.state.params.item
                .solicitation_observations_description
            }
          </Text>
        </Card>

        {item.status_id != 20 && (
          <View style={styles.ButtonContainer}>
            <TouchablePlatformSpecific
              onPress={() =>
                this.props.navigation.navigate("EditQuestion", {
                  item,
                  isReturnedRequest: true
                })
              }
            >
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="search"
                />
                <Text style={styles.TextLight}>Editar pergunta</Text>
              </View>
            </TouchablePlatformSpecific>
          </View>
        )}
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
    marginTop: 20
  },

  Title: {
    fontSize: 16
  },

  Input: {
    width: "100%",
    height: height * 0.45,
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20
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
    alignItems: "center"
  },

  ButtonContainer: {
    flexDirection: "row",
    height: 54,
    justifyContent: "space-between",
    marginBottom: 10
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
  },

  TextDark: {
    fontSize: 14,
    color: "#202020",
    fontWeight: "600",
    textAlign: "center"
  }
});
