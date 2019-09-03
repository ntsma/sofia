
/*RelatedQuestionsView.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import {
  Card,
  ThemeProvider,

} from "react-native-elements";


import {
  Icon,
  Text,
  Button

} from "native-base";

import BackHeader from "../components/BackHeader";

export default class RelatedQuestionsView extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };
  render() {
   const questions = this.props.navigation.state.params.questions;

   return (
     <ThemeProvider>
       <BackHeader navigation={this.props.navigation} name="Perguntas relacionadas"/>

       <FlatList
        data={questions}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => <Card
                                >
                                  <Text
                                    style={{marginBottom: 10}}
                                    onPress={() => this.props.navigation.navigate("Overlay", {item})}
                                  >
                                    {item.description}
                                  </Text>
                                </Card>}
      />

      <Button block danger onPress={() => this.props.navigation.navigate("NewSearch")}>
        <Text>Não solucionou sua dúvida?</Text>
      </Button>

     </ThemeProvider>

    );
 }
}
