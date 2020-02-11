import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from "react-native";

import BadgeContent from "../components/BadgeContent";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ListItemComponent extends Component {
  render() {
    const page = this.props.page;
    const item = this.props.question;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

    return (
      <TouchablePlatformSpecific
        onPress={() => this.props.navigation.navigate(page, { item })}
      >
        <View style={styles.Item}>
          <View style={styles.Icon}>
            <Icon name="inbox" size={30} color="#000" />
          </View>
          <View style={styles.ContainerText}>
            <Text numberOfLines={1} style={styles.Text}>
              {item.description}
            </Text>
            <BadgeContent status_id={item.status_id} />
          </View>
          <View style={styles.Arrow}>
            <Icon name="chevron-right" size={30} color="#3c8dbc" />
          </View>
        </View>
      </TouchablePlatformSpecific>
    );
  }
}

const styles = StyleSheet.create({
  Item: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff"
  },

  Icon: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },

  ContainerText: {
    width: "75%",
    height: "auto",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 15,
    paddingBottom: 15
  },

  Text: {
    fontSize: 14,
    color: "#202020",
    fontWeight: "normal"
  },

  Arrow: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.5)"
  }
});
