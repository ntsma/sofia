import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class NumberOfIssuesBadge extends Component {
  render() {
    if (this.props.isConnected) {
      if (this.props.existsRequestsWithoutEvaluation == true) {
        return (
          <View style={styles.Container}>
            <View style={[styles.Badge, { backgroundColor: "#ff4444" }]}>
              <Text style={styles.Text}>{this.props.number}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.Container}>
            <View style={[styles.Badge, { backgroundColor: "#3c8dbc" }]}>
              <Text style={styles.Text}>{this.props.number}</Text>
            </View>
          </View>
        );
      }
    } else {
      return <View></View>;
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
    borderRadius: 15,
    marginTop: 5
  },

  Text: {
    color: "#FFF",
    fontSize: 12,

    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4
  }
});
