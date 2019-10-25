/*Question.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import {
  Card,
  Text,
  ThemeProvider

} from "react-native-elements";

import BackHeader from "../components/BackHeader";

export default class Question extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
   return (
     <ThemeProvider>
       <BackHeader navigation={this.props.navigation} name="Dúvida" />

       <ScrollView>
        <Card title={this.props.navigation.state.params.item.title}>
          <Text style={{marginBottom: 10}}>
            {this.props.navigation.state.params.item.content}
          </Text>
        </Card>
       </ScrollView>

     </ThemeProvider>

    );
 }
}
