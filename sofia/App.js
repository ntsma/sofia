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

import Login from "./src/views/Login";
import SignUp from "./src/views/SignUp";
import HomeScreen from "./src/views/HomeScreen";
import SubmittedIssues from "./src/views/SubmittedIssues";
import DraftIssues from "./src/views/DraftIssues";
import CanceledIssues from "./src/views/CanceledIssues";
import AnsweredIssues from "./src/views/AnsweredIssues";
// import NewQuestion from "./src/views/NewQuestion";
import Overlay from "./src/views/Overlay";
import Question from "./src/views/Question";
import EditQuestion from "./src/views/EditQuestion";
import ShowObservation from "./src/views/ShowObservation";
import EditCanceledIssue from "./src/views/EditCanceledIssue";
import ShowDetails from "./src/views/ShowDetails";
import RelatedQuestionsView from "./src/views/RelatedQuestionsView";
import Search from "./src/views/Search";
import RelatedIssueView from "./src/views/RelatedIssueView";
import CPF from "./src/views/CPF";
import FAQ from "./src/old/FAQ";
import TeleconsultoriaRealizada from "./src/views/TeleconsultoriaRealizada";

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
    TeleconsultoriaRealizada: {
      screen: TeleconsultoriaRealizada,
      navigationOptions: {
        title: "TeleconsultoriaRealizada"
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

    Search: {
      screen: Search,
      navigationOptions: {
        title: "Search"
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

    // NewQuestion: {
    //   screen: NewQuestion,
    //   navigationOptions: {
    //     title: "NewQuestion"
    //   }
    // },

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
    },
    FAQ: {
      screen: FAQ,
      navigationOptions: {
        title: "Dúvidas Gerais"
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
