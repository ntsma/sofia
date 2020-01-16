/*ErrorNoInternetMessage.js*/
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ErrorNoInternetMessage extends Component {
  render() {
    if (this.props.isConnected) {
      return (
        <View style={styles.Container}>
          <View style={[styles.Badge, { backgroundColor: "#00C851" }]}>
            <Text style={styles.Text}>Você está conectado!</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <View style={[styles.Badge, { backgroundColor: "#ff4444" }]}>
            <Text style={styles.Text}>Você não está conectado!</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },

  Badge: {
    alignSelf: "flex-start",
    backgroundColor: "#00C851",
    borderRadius: 10,
    marginTop: 5
  },

  Text: {
    color: "#FFF",
    fontSize: 10,

    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4
  }
});
