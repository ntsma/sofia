/*DraftIssues.js*/
import React, { Component } from "react";
import { FlatList, Modal } from "react-native";
import { Container } from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import DraftIssue from "../components/DraftIssue";
import BackHeader from "../components/BackHeader";
import DraftDeletedPopUp from "../components/DraftDeletedPopUp";

export default class DraftIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      "draftIssues": [],
      "isDraftDeletedModalVisible": false,
    };
  //  this.changeDraftDeletedModalVisibility= this.changeDraftDeletedModalVisibility.bind(this)
  }

  componentDidMount() {
    this.a();
  }

  async a() {
    var draftQuestions = null;

    console.log("DRAFT QUESTIONS");
    console.log(draftQuestions);

    if(draftQuestions == null) {
      draftQuestions = "[]";
    }

    this.setState({
      "draftIssues": JSON.parse(draftQuestions)
    });

    console.log("DRAFT ISSUES");
    console.log(this.state.draftIssues);

    var v = this.state.draftIssues.concat(this.props.navigation.state.params.draftIssues);

    this.setState({
      "draftIssues": v
    });

    console.log("DRAFT QUESTIONS");
    console.log(this.state.draftIssues);
  }

  changeDraftDeletedModalVisibility = (bool) => (
  this.setState({ isDraftDeletedModalVisible : bool })
)

  render() {
    const draftIssues = this.state.draftIssues;
    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunho"/>

        <FlatList
          data={draftIssues}
          keyExtractor={item => item.id.toString() + this.state.draftIssues.length + 1}
          renderItem={({item}) => <DraftIssue changeDraftDeletedModalVisibility={this.changeDraftDeletedModalVisibility.bind(this)}  isDraftDeletedModalVisible={this.state.isDraftDeletedModalVisible} navigation={this.props.navigation} question={item}/>}
        />

        <Modal transparent={true} visible={this.state.isDraftDeletedModalVisible} onRequestClose={() => this.changeDraftDeletedModalVisibility(false)} animationType='fade'>
          <DraftDeletedPopUp changeDraftDeletedModalVisibility={this.changeDraftDeletedModalVisibility.bind(this)}/>
        </Modal>
      </Container>
    );
  }
}
