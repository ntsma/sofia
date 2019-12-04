import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "native-base";

import logo from "../resources/logo.png";

const LoginHeader = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.text}>Sofia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginBottom: 100
  },

  logo: {
    width: 100,
    height: 100
  },

  text: {
    color: "black",
    marginTop: 20,
    width: 200,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 50
  }
});

export default LoginHeader;
