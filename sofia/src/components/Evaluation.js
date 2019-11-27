import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  View,
  Modal
} from "react-native";

import {
  Badge,
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Textarea,
  Title,
  Thumbnail
} from "native-base";

import {
    Rating,
    AirbnbRating,
    Card

} from 'react-native-elements';

import EvaluateButton from "./EvaluateButton";
import RatedPopUp from "./RatedPopUp";

export default class Evaluation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "sastifaction": 0,
      "attendance": 0,
      "observation": "",
      isModalRateVisible: false,
      buttonIsVisible: false,
      commentIsNecessary: false
    };
  }

  changeModalRateVisibility = (bool) => (
  this.setState({ isModalRateVisible : bool })
)

onPressRate(){
  this.changeModalRateVisibility(true);
  this.setAttendance();
  //console.log('çodal', this.isModalVisible)
}

  componentDidMount() {
    const evaluation_satisfaction_status_id = this.props.data.evaluation_satisfaction_status_id;
    const evaluation_attendance_status_id = this.props.data.evaluation_attendance_status_id;
    const evaluation_observation = this.props.data.evaluation_description;

    this.setState({
      "sastifaction": [31, 30, 29, 28, 27].indexOf(evaluation_satisfaction_status_id),
      "attendance": [34, 33, 32].indexOf(evaluation_attendance_status_id),
      "observation": evaluation_observation
    })

    if(this.props.buttonIsVisible) { 
      this.setState({
        "buttonIsVisible": true,
        "sastifaction": 0,
        "attendance": 0,
        "observation": ""
      })  
    } else {
      this.setState({
        "buttonIsVisible": (this.props.data.status_id == 21) ? true : false  
      })
    }

  }

  setSatifaction(text) {
    const array = [31, 30, 29, 28, 27];
    const sastifaction = array[text - 1];

    this.setState({
      "sastifaction": sastifaction
    });

    console.log(this.state);
  }

  setAttendance(text) {
    const array = [34, 33, 32];
    const attendance = array[text - 1];

    this.setState({
      "attendance": attendance
    });
    console.log(this.state);

  }

  onPressRate(){
    this.changeModalRateVisibility(true);
    this.setAttendance();
    //console.log('çodal', this.isModalVisible)
  }

  render() {
  
    return (
      <Card title="Avaliação">
        <Label>Grau de Satisfação</Label>
        <AirbnbRating
          count={5}
          defaultRating={this.state.sastifaction}
          reviews={["Péssimo", "Ruim", "Regular", "Boa", "Ótima"]}
          onFinishRating={this.setSatifaction.bind(this)}
          size={20}
        />

      <Label>Grau de Atendimento</Label>
        <AirbnbRating
          count={3}
          reviews={["Não Atendeu", "Parcialmente", "Totalmente"]}
          defaultRating={this.state.attendance}
          size={20}
          onFinishRating={this.setAttendance.bind(this)}
        />
        <Modal transparent={true} visible={this.state.isModalRateVisible} onRequestClose={() => this.changeModalRateVisibility(false)} animationType='fade'>
          <RatedPopUp changeModalRateVisibility={this.changeModalRateVisibility}/>
        </Modal>

        <Textarea
          style={searchStyles.Input}
          value={this.state.observation}
          onChangeText={observation => this.setState({ observation })}
          placeholder="Críticas e sugestões"
          placeholderTextColor="#999"
          bordered
        />

        <EvaluateButton onClose={this.props.onClose} navigation={this.props.navigation} data={this.props.data} observation={this.state.observation} sastifaction={this.state.sastifaction} attendance={this.state.attendance} buttonIsVisible={this.state.buttonIsVisible} judgeType={this.props.judgeType} />
      </Card>
    );
  }
}


const height = Dimensions.get("window").height;

const searchStyles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    marginTop: 20
  },

  Input: {
    width: "100%",
    height: height * 0.5,
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20
  }
});
