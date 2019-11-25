import React from 'react';
import { TextInput } from 'react-native';

import styles from '../config/Login';

const EmailInput = ({props}) => {
    return(
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="Digite seu E-mail ou CPF"
        placeholderTextColor="#999"
        style={styles.input}
        value={props.email}
        onChangeText={email => props.setState({ email })}
        onSubmitEditing={() => props.passwordInput.focus()}
      />
    )

}

export default EmailInput;