import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./app/views/Login";
import SignUp from "./app/views/SignUp";
import HomeScreen from "./app/views/HomeScreen";
import SubmittedIssues from "./app/views/SubmittedIssues";
import DraftIssues from "./app/views/DraftIssues";
import CanceledIssues from "./app/views/CanceledIssues";
import AnsweredIssues from "./app/views/AnsweredIssues";
import NewQuestion from "./app/views/NewQuestion";
import Overlay from "./app/views/Overlay";
import Question from "./app/views/Question";
import EditQuestion from "./app/views/EditQuestion";
import ShowObservation from "./app/views/ShowObservation";
import EditCanceledIssue from "./app/views/EditCanceledIssue";
import ShowDetails from "./app/views/ShowDetails";
import RelatedQuestionsView from "./app/views/RelatedQuestionsView";
import NewSearch from "./app/views/NewSearch";
import RelatedIssueView from "./app/views/RelatedIssueView";
import CPF from "./app/views/CPF";

class Home extends Component {
  state = {
    logging: "false"
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.retrieveData();
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      elevation: null
    },
    header: null
  };

  async retrieveData() {
    const value = await AsyncStorage.getItem("logging");
    const email = await AsyncStorage.getItem("email");

    console.debug(value);

    this.setState({
      logging: value
    });
  }

  render() {
    if (this.state.logging == "true") {
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
  const sceneRange = [index - 1, index];
  //const outputOpacity = [0, 1];
  const outputWidth = [width, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth
  });

  return {
    //opacity: transition
    transform: [{ translateX: transition }]
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;
      const width = sceneProps.layout.initWidth;

      return SideTransition(index, position, width);
    }
  };
};

const App = createStackNavigator(
  {
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
      }
    },

    RelatedQuestionsView: {
      screen: RelatedQuestionsView,
      navigationOptions: {
        title: "RelatedQuestionsView"
      }
    },

    NewSearch: {
      screen: NewSearch,
      navigationOptions: {
        title: "NewSearch"
      }
    },

    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },

    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Cadastro"
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

    RelatedIssueView: {
      screen: RelatedIssueView,
      navigationOptions: {
        title: "RelatedIssueView"
      }
    },

    ShowDetails: {
      screen: ShowDetails,
      navigationOptions: {
        title: "ShowDetails"
      }
    },

    EditCanceledIssue: {
      screen: EditCanceledIssue,
      navigationOptions: {
        title: "EditCanceledIssue"
      }
    },

    CPF: {
      screen: CPF,
      navigationOptions: {
        title: "CPF"
      }
    }
  },
  {
    transitionConfig: NavigationConfig
  }
);

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
