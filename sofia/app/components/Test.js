import React, { Component } from "react";
import { AppRegistry, StyleSheet, Image, View, FlatList, Alert, TextInput, TouchableOpacity, Linking, ScrollView } from "react-native";

import {Header, Container, Left, Text,  Body, Icon, Button, Right, Title, Card, CardItem, Badge } from "native-base";

import { StackNavigator } from "react-navigation";

import Question from "./Question";

export default class Test extends Component {
  static navigationOptions = {
    title: 'Voltar',
    headerStyle: {
      backgroundColor: "#3c8dbc",
      elevation: null,
      color: "#fff"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state ={ dataSource: []}
  }

  componentDidMount(){
    return fetch('https://gist.githubusercontent.com/vieiraeduardos/3be38803c48bb92ca3cd88ff5c85131e/raw/f65f8a9c989277085cde934e8d4a454308e890b5/test.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          dataSource: responseJson.questions,
        }, function(){

        });

      })
      .catch((error) =>{
        this.setState({
          dataSource: JSON.stringify(error),
        }, function(){

        });
      });
  }

  render() {
    return (
      <Container>
        <Header hasTabs androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}

            >
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Voltar</Title>
          </Body>
        </Header>

        <ScrollView>

          <FlatList
            data={this.state.dataSource}
            renderItem={ ({item}) => <Question question={item} /> }
            keyExtractor={ ({id}, index) => "ID" + index }
          />


          <Button block success style={{ margin: 10, marginLeft: 40, marginRight: 40}}
            onPress={() => {
              this.props.navigation.navigate("QRCodeReader");
            }}
            >
            <Text>Finalizar</Text>
          </Button>

        </ScrollView>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  subtext: {
    color: "black",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    backgroundColor: 'blue',
    color: 'white'
  },
  button: {
    backgroundColor: "#3c8dbc",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  }
});


AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
