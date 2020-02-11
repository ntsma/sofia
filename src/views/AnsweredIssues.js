/*AnsweredIssues.js*/
import React, { Component } from "react";
import { FlatList, View } from "react-native";

import ListItemComponent from "../components/ListItemComponent";

export default class AnsweredIssues extends Component {
  componentDidMount() {
    this.props.navigation.state.params.estado.isConnected;
  }

  update() {
    shouldUpdate = true;
    this.props.navigation.navigate("HomeScreen", { shouldUpdate });
  }

  render() {
    const answeredIssues = this.props.navigation.state.params.answeredIssues;

    return (
      <View>
        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ListItemComponent
              navigation={this.props.navigation}
              question={item}
              page={"Overlay"}
            />
          )}
        />
      </View>
    );
  }
}
