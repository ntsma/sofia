/*SubmittedIssue.js*/
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Badge, Body, Container, Icon, Left, Right, ListItem, Text } from "native-base";

import BadgeContent from "../components/BadgeContent";

export default class SubmittedIssue extends Component {

  render() {
    const item = this.props.question;
    return (
      <ListItem thumbnail style={styles.list}
      onPress={() => this.props.navigation.navigate("ShowDetails", {item})}>
        <Left>
          <Icon style={styles.inbox} type="MaterialIcons" name="inbox" />
        </Left>
        <Body>
          <Text numberOfLines={1} style={styles.bodyText}>{item.description}</Text>
          <BadgeContent status_id={item.status_id}/>
        </Body>
        <Right>
          <Icon style={styles.next} type="MaterialIcons" name="chevron-right" />
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create ({
  bodyText: {
    marginTop: -5
  },
  inbox: {
    width: 30,
    height: 30,
    fontSize: 30,
  },
  badge: {
    height: 20,
    marginTop: 5,
    marginBottom: -5
  },
  badgeText: {
    fontSize: 8,
    margin: -2
  },
  next: {
    height: 30,
    fontSize: 30
  }
});
