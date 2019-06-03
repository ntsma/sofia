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
        <Post />
        <Post />
        <Post />

      </ScrollView>
    );
  }

}
