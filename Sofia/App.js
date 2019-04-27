import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from "./HomeScreen";
import NewQuestion from "./NewQuestion"
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
        header: null,
      },
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
        header: null,
      },
  }
}, {
    initialRouteName: 'Home',
}

);

export default createAppContainer(AppNavigator);
