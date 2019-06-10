/*News.js*/

import React, { Component } from "react";

import {
  ScrollView,

} from "react-native";

import Post from "./Post";

export default class News extends Component {

  render() {
    return (
      <ScrollView>
        <Post name="1.jpg" />
        <Post name="2.jpg" />
        <Post name="3.jpg" />

      </ScrollView>
    );
  }

}
