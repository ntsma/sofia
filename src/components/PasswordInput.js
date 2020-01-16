import React, { Component } from "react";
import { TextInput, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "../Styles/Styles";

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputIsVisible: true,
      icon: "visibility-off"
    };
  }

  /*Torna a senha vísivel ou não.*/
  changePasswordVisibility = () => {
    this.setState({
      icon: this.state.icon === "visibility" ? "visibility-off" : "visibility",
      inputIsVisible: !this.state.inputIsVisible
    });
  };
  render() {
    return (
      <View style={styles.Input}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          style={{ flex: 1 }}
          secureTextEntry={this.state.inputIsVisible}
          value={this.props.props.state.password}
          ref={input => (this.props.props.passwordInput = input)}
          onChangeText={password => this.props.props.setState({ password })}
        />
        <Icon
          name={this.state.icon}
          size={25}
          color="#000"
          style={{ marginTop: 10 }}
          onPress={() => this.changePasswordVisibility()}
        />
      </View>
    );
  }
}

export default PasswordInput;
