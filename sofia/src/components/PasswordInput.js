import React from 'react';
import { TextInput, View } from 'react-native';

import { Icon } from 'native-base';

import styles from '../config/Login';

const PasswordInput = ({props}) => {
    return(
        <View style={styles.hidePassword}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="go"
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                style={styles.inputPassword}
                secureTextEntry={props.state.inputIsVisible}
                value={props.state.password}
                ref={input => (props.passwordInput = input)}
                onChangeText={password => props.setState({ password })}
            />

            <Icon style={styles.iconPassword} name={props.state.icon} onPress={() => props.changePasswordVisibility()} />
            
        </View>
        )
}

export default PasswordInput;