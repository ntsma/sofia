import React from 'react';
import { Image, View } from "react-native";
import { Text } from "native-base";

import styles from '../Styles/Login';
import logo from '../resources/logo.png';

const LoginHeader = () => {
    return(
        <View style={styles.header}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.text}>Sofia</Text>
        </View>
    )
}

export default LoginHeader;