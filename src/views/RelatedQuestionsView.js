/*RelatedQuestionsView.js*/
import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class RelatedQuestionsView extends Component {
  render() {
    const questions = this.props.navigation.state.params.questions;
    const user_questions = this.props.navigation.state.params.user_questions;
    const question = this.props.navigation.state.params.question;

    let TouchablePlatformSpecific =
      Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {user_questions && (
            <View>
              <Text style={stylesLocal.Title}>
                Perguntas realizadas por você que podem ter relação com a
                pergunta atual
              </Text>

              <FlatList
                data={user_questions}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchablePlatformSpecific
                    onPress={() =>
                      this.props.navigation.navigate("RelatedIssueView", {
                        item
                      })
                    }
                  >
                    <View style={stylesLocal.Item}>
                      <View style={stylesLocal.Icon}>
                        <Icon name="person-outline" size={30} color="#3c8dbc" />
                      </View>
                      <View style={stylesLocal.ContainerText}>
                        <Text numberOfLines={2} style={stylesLocal.Text}>
                          {item.description}
                        </Text>
                      </View>
                      <View style={stylesLocal.Arrow}>
                        <Icon name="chevron-right" size={30} color="#3c8dbc" />
                      </View>
                    </View>
                  </TouchablePlatformSpecific>
                )}
              />
            </View>
          )}

          <View>
            <Text style={stylesLocal.Title}>
              Perguntas que possivelmente possuam uma resposta para você
            </Text>

            <FlatList
              data={questions}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchablePlatformSpecific
                  onPress={() =>
                    this.props.navigation.navigate("RelatedIssueView", { item })
                  }
                >
                  <View style={stylesLocal.Item}>
                    <View style={stylesLocal.Icon}>
                      <Icon name="assignment" size={30} color="#3c8dbc" />
                    </View>
                    <View style={stylesLocal.ContainerText}>
                      <Text numberOfLines={2} style={stylesLocal.Text}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={stylesLocal.Arrow}>
                      <Icon name="chevron-right" size={30} color="#3c8dbc" />
                    </View>
                  </View>
                </TouchablePlatformSpecific>
              )}
            />
          </View>
        </ScrollView>

        <TouchablePlatformSpecific
          onPress={() =>
            this.props.navigation.navigate("Question", { question })
          }
        >
          <View style={stylesLocal.Button}>
            <Text style={stylesLocal.TextButton}>
              Não solucionou sua dúvida?
            </Text>
          </View>
        </TouchablePlatformSpecific>
      </View>
    );
  }
}

const stylesLocal = StyleSheet.create({
  Title: {
    color: "#3c8dbc",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 37,
    marginRight: 37,
    marginTop: 20,
    marginBottom: 10
  },

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
    height: 64,
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
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#bc493c",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },

  TextButton: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold"
  }
});
