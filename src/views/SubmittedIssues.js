/*SubmittedIssues.js*/
import React, { Component } from "react";
import { FlatList, View } from "react-native";

import ListItemComponent from "../components/ListItemComponent";

export default class SubmittedIssues extends Component {
  render() {
    const submittedIssues = this.props.navigation.state.params.submittedIssues;

    return (
      <View>
        <FlatList
          data={submittedIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ListItemComponent
              navigation={this.props.navigation}
              page={"ShowDetails"}
              question={item}
            />
          )}
        />
      </View>
    );
  }
}
