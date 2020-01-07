/*Question.js*/
import React, { Component } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Card, Text, ThemeProvider } from "react-native-elements";

export default class Question extends Component {
  render() {
    return (
      <ThemeProvider>
        <ScrollView>
          <Card title={this.props.navigation.state.params.item.title}>
            <Text style={{ marginBottom: 10 }}>
              {this.props.navigation.state.params.item.content}
            </Text>
          </Card>
        </ScrollView>
      </ThemeProvider>
    );
  }
}
