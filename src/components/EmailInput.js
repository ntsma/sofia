import React from "react";
import { TextInput } from "react-native";

import styles from "../Styles/Styles";

const EmailInput = ({ props }) => {
  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      returnKeyType="next"
      placeholder="Digite seu E-mail ou CPF"
      placeholderTextColor="#999"
      style={styles.Input}
      value={props.email}
      onChangeText={email => props.setState({ email })}
      onSubmitEditing={() => props.passwordInput.focus()}
    />
  );
};

export default EmailInput;
