import React, {Component} from 'react';
import { TextInput, View } from 'react-native';

import { Icon } from 'native-base';

import styles from '../config/Login';

class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputIsVisible: true, 
            icon: "eye-off", 
        };
    }

    /*Torna a senha vísivel ou não.*/
    changePasswordVisibility = () => {
        this.setState({ 
            icon: this.state.icon === 'eye' ? 'eye-off' : 'eye', 
            inputIsVisible: !this.state.inputIsVisible 
        }); 
    }
    render() {
        return(
            <View style={styles.hidePassword}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    style={styles.inputPassword}
                    secureTextEntry={this.state.inputIsVisible}
                    value={this.props.state.state.password}
                    ref={input => (this.props.state.passwordInput = input)}
                    onChangeText={password => this.props.state.setState({ password })}
                />
    
                <Icon style={styles.iconPassword} name={this.state.icon} onPress={() => this.changePasswordVisibility()} />
                
            </View>
        )
    }
}

export default PasswordInput;