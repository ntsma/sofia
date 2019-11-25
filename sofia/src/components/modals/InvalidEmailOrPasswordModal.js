import React, {Component} from "react";
import { TouchableOpacity, View } from "react-native";

import { Text } from "native-base";

import ModalComponent from '../ModalComponent';
import styles from '../../config/Login';

class InvalidEmailOrPasswordModal extends Component {
    render() {
        return( 
            <ModalComponent 
                modalIsVisible={this.modalIsVisible} 
                content={
                <View style={styles.ModalContainer}>
                    <Text style={styles.ModalText}>E-mail ou senha estão incorretos!</Text>
                    <TouchableOpacity onPress={ this.props.handleClose } style={styles.button}>
                    <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
                }
            />
        )
    }
}

export default InvalidEmailOrPasswordModal;