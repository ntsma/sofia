/*BackHeader.js*/
import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { Header, Button, Icon } from "native-base";

export default class BackHeader extends Component {
  render() {
    return (
      <Header style={header.background}>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />
        <View style={header.container}>
          <Button transparent style={header.button} onPress={() => this.props.navigation.goBack() }>
            <Icon style={header.icon} type="MaterialIcons" name="arrow-back" />
          </Button>
          <Text style={header.text}>{this.props.name}</Text>
        </View>
      </Header>
    );
  }
}

const header = StyleSheet.create({
  background: {
    backgroundColor: '#3c8dbc',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 37,
  },

  button: {
    backgroundColor: '#3c8dbc',
    width: 50,
  },

  icon: {
    width: 37,
    color: '#FFF',
    fontSize: 25,
    marginRight: 17,
    marginLeft: 20,
    textAlign: 'center',
  },

  text: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
  },

});

      // <Header androidStatusBarColor="#3c8dbc" style={{ backgroundColor: "#3c8dbc"}}>
      //   <Left >
      //     <Button transparent style={{width: 50}}
      //     onPress={() => this.props.navigation.goBack() }>
      //       <Icon style={{ color: '#FFF' }} type="MaterialIcons" name="arrow-back" />
      //     </Button>
      //   </Left>
      //   <Body>
      //     <Title style={{color: '#FFF'}}>{this.props.name}</Title>
      //   </Body>
      // </Header>