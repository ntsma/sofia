/*AnsweredIssues.js*/
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Button, Text } from "native-base";

import AnsweredIssue from "../components/AnsweredIssue";
import BackHeader from "../components/BackHeader";

export default class AnsweredIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    console.log(this.props.navigation.state.params.estado);

    this.props.navigation.state.params.estado.isConnected
  }

  update() {
    shouldUpdate = true;
    this.props.navigation.navigate("HomeScreen", {shouldUpdate});
  }

  render() {
    const answeredIssues = this.props.navigation.state.params.answeredIssues;

    return (
      <Container>
        <Button block light onPress={() => this.update() }>

            <Text>Respondidas</Text>
        </Button>
        <BackHeader navigation={this.props.navigation} name="Respondidas"/>
        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <AnsweredIssue navigation={this.props.navigation} question={item}/>}
        />
      </Container>
    );
  }
}
