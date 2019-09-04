
/*RelatedQuestionsView.js*/

import React, {Component} from "react";

import {
  FlatList,
  StyleSheet
} from 'react-native';

import {
  ThemeProvider,
} from "react-native-elements";

import {
  Icon,
  Text,
  Button, 
  Body,
  Left, 
  Right, 
  ListItem
} from "native-base";

import BackHeader from "../components/BackHeader";

export default class RelatedQuestionsView extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
   const questions = this.props.navigation.state.params.questions;
   const question = this.props.navigation.state.params.question;
   
   return (
     <ThemeProvider>
       <BackHeader navigation={this.props.navigation} name="Perguntas relacionadas"/>

       <FlatList
        data={questions}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => 
          <ListItem thumbnail
            onPress={() => this.props.navigation.navigate("Overlay", {item})}>
            <Body>
              <Text style={{minHeight: 30}} numberOfLines={3}>{item.description}</Text>
            </Body>
            <Right>
              <Icon style={styles.next} type="MaterialIcons" name="chevron-right" />
            </Right>
          </ListItem>
        }/>

      <Button block danger onPress={() => this.props.navigation.navigate("NewSearch", {question})}>
        <Text>Não solucionou sua dúvida?</Text>
      </Button>

     </ThemeProvider>

    );
 }
}

const styles = StyleSheet.create ({
  next: {
    height: 30,
    fontSize: 30,
    color: '#3c8dbc'
  }
});