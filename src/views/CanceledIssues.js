/*CanceledIssues.js*/
import React, { Component } from "react";
import { FlatList, View } from "react-native";

import ListItemComponent from "../components/ListItemComponent";

export default class CanceledIssues extends Component {
  render() {
    const { canceledIssues } = this.props.navigation.state.params;

    return (
      <View>
        <FlatList
          data={canceledIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ListItemComponent
              navigation={this.props.navigation}
              page={"ShowObservation"}
              question={item}
            />
          )}
        />
      </View>
    );
  }
}
