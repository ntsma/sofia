import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from "./app/components/Login";
import HomeScreen from "./app/components/HomeScreen";
import SubmittedIssues from "./app/components/SubmittedIssues";
import DraftIssues from "./app/components/DraftIssues";
import CanceledIssues from "./app/components/CanceledIssues";
import AnsweredIssues from "./app/components/AnsweredIssues";
import NewQuestion from "./app/components/NewQuestion";
import Overlay from "./app/components/Overlay";
import Question from "./app/components/Question";
import EditQuestion from "./app/components/EditQuestion";
import ShowObservation from "./app/components/ShowObservation";

class Home extends Component<{}> {

  state = {
    logging: "false"
  };

  constructor() {
    super();

  }

  componentDidMount() {
    this.retrieveData()

  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      elevation: null
    },
    header: null
  };

  async retrieveData() {
    const value = await AsyncStorage.getItem('logging');
    const email = await AsyncStorage.getItem('email');

    console.debug(value);

    this.setState({
      logging: value
    })
  };

  render() {

    if(this.state.logging == "true") {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#3c8dbc" />
          <HomeScreen navigation={this.props.navigation} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#3c8dbc" />
          <Login navigation={this.props.navigation} />
        </View>
      );
    }
  }
}

const SideTransition = (index, position, width) => {
  const sceneRange = [index -1, index];
  //const outputOpacity = [0, 1];
  const outputWidth = [width, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth,
  });

  return {
    //opacity: transition
    transform: [{ translateX: transition }]
  }
}

const NavigationConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;
      const width = sceneProps.layout.initWidth;

      return SideTransition(index, position, width);
    }
  }
}

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
        title: "HomeScreen"
      },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },

  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "NewQuestion"
    }
  },

  EditQuestion: {
    screen: EditQuestion,
    navigationOptions: {
      title: "EditQuestion"
    }
  },

  Question: {
    screen: Question,
    navigationOptions: {
      title: "Question"
    }
  },

  DraftIssues: {
    screen: DraftIssues,
    navigationOptions: {
      title: "DraftIssues"
    }
  },

  CanceledIssues: {
    screen: CanceledIssues,
    navigationOptions: {
      title: "CanceledIssues"
    }
  },

  AnsweredIssues: {
    screen: AnsweredIssues,
    navigationOptions: {
      title: "AnsweredIssues"
    }
  },

  SubmittedIssues: {
    screen: SubmittedIssues,
    navigationOptions: {
      title: "SubmittedIssues"
    }
  },

  Overlay: {
    screen: Overlay,
    navigationOptions: {
      title: "Overlay"
    }
  },
  
  ShowObservation: {
    screen: ShowObservation,
    navigationOptions: {
      title: "ShowObservation"
    }
  },
}, {
  transitionConfig: NavigationConfig
});

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
