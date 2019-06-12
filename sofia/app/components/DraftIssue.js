/*DraftIssue.js*/
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Badge, Body, Container, Icon, Left, Right, ListItem, Text } from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

export default class DraftIssue extends Component {

  async onDeleteDraftIssue() {
    var token = await AsyncStorage.getItem("token");
    const item = this.props.question;

    console.log(item);

    return fetch('http://plataforma.homolog.huufma.br/api/solicitation/destroy/' + item.id, {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + token
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.debug("RESPOSTA");
        console.debug(responseJson);

        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    const item = this.props.question;
    return (
      <ListItem thumbnail style={styles.list}>
        <Left>
          <Icon style={styles.inbox} type="MaterialIcons" name="inbox" />
        </Left>
        <Body>
          <Text numberOfLines={1} style={styles.bodyText}>{item.description}</Text>
        </Body>
        <Right style={styles.icons}>
            <Icon style={styles.delete} type="MaterialIcons" name="delete-forever" onPress={ this.onDeleteDraftIssue.bind(this) } />
            <Icon style={styles.edit} type="MaterialIcons" name="create" onPress={() => this.props.navigation.navigate("EditQuestion", {item})} />
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create ({
  inbox: {
    width: 40,
    height: 40,
    fontSize: 40,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  delete: {
    padding: 5,
    fontSize: 30,
    color: '#fff',
    backgroundColor: '#ff1f1f',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: -10,
    marginTop: -7
  },
  edit: {
    padding: 5,
    fontSize: 30,
    color: '#fff',
    backgroundColor: '#5acb56',
    borderRadius: 10,
    marginBottom: -10,
    marginTop: -7
  }
});
