import React, { Component } from "react";

import {
  Button,
  Text,
} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import Evaluation from '../services/Evaluation';

export default class EvaluateButton extends Component {

  judgeNormal(token, sastifaction, attendance, observation) {
    const solicitation_id = this.props.data.solicitation_id;
    Evaluation.judgeRequestMadeByMe(token, sastifaction, attendance, observation, solicitation_id)
    .then(response => {
      console.log("Avaliação de questão respondida");
      console.debug(response);

      shouldUpdate = true;
      this.props.navigation.navigate("EvaluationFeedback", {shouldUpdate});

    })
    .catch(error => {
      console.log(err)
    })
    
  }
  
  judgeRelatedIssue(token, sastifaction, attendance, observation){
    Evaluation.judgeRequest(token, sastifaction, attendance, observation, this.props.data.answer_id)
    .then((response) => {
      console.log("Avaliação de questão relacionada");
      console.debug(response);

      shouldUpdate = true;
      this.props.navigation.navigate("EvaluationFeedback", {shouldUpdate});

    })
    .catch(error => {
      console.log(error);
    });
  }

  async judge() {
    const sastifaction = this.props.sastifaction;
    const attendance = this.props.attendance;
    const observation = this.props.observation;

    const token = await AsyncStorage.getItem("token");

    if(this.props.judgeType == "1") {
      this.judgeNormal(token, sastifaction, attendance, observation);

    } else {
      this.judgeRelatedIssue(token, sastifaction, attendance, observation);
      this.props.onClose();
    }

  }

  render() {
    if(this.props.buttonIsVisible) {
      return (
        <Button block success style={{ marginLeft: 30, marginRight: 30, marginTop: 30}}
          onPress={() => {
            this.judge();
          }}
          >
          <Text>Avaliar</Text>
        </Button>
      );

    } else {
      return(
        <Text></Text>
      );
    }

  }
}
