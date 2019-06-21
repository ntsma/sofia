/*AnsweredIssue.js*/
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Badge, Body, Container, Icon, Left, Right, ListItem, Text } from "native-base";

export default class AnsweredIssue extends Component {

  constructor() {
      super()
      this.state = {
         myText: '',
         color: '',
      }
   }
   
   componentWillMount() {
    this.updateBadge();
  }

  updateBadge() {
    const id = this.props.question.status_id;

    if(this.props.question.description == "O que é dengue") {
      this.state.color = "#00a65a ";
    }
  }

  render() {
    const item = this.props.question;
    return (
      <ListItem thumbnail style={styles.list}
      onPress={() => this.props.navigation.navigate("Overlay", {item})}>
        <Left>
          <Icon style={styles.inbox} type="MaterialIcons" name="inbox" />
        </Left>
        <Body>
          <Text numberOfLines={1} style={styles.bodyText}>{item.description}</Text>
          <Badge style={[styles.badge, {backgroundColor: this.state.color}]}>
            <Text style={styles.badgeText}>this.state.myText</Text>
          </Badge>
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
    fontSize: 10,
    margin: -2
  },
  next: {
    height: 30,
    fontSize: 30
  }
});