/*DraftIssues.js*/
import React, { Component } from "react";
import { FlatList, Modal } from "react-native";
import { Container } from "native-base";

import DraftIssue from "../components/DraftIssue";
import BackHeader from "../components/BackHeader";
import DraftDeletedPopUp from "../components/DraftDeletedPopUp";

export default class DraftIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      'isDraftDeletedModalVisible': false
    };
  };
  
  changeDraftDeletedModalVisibility = bool =>
    this.setState({ isDraftDeletedModalVisible: bool });

  render() {
    const {draftIssues} = this.props.navigation.state.params;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunhos" />

        <FlatList
          data={draftIssues}
          keyExtractor={item =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <DraftIssue
              changeDraftDeletedModalVisibility={this.changeDraftDeletedModalVisibility.bind(
                this
              )}
              isDraftDeletedModalVisible={this.state.isDraftDeletedModalVisible}
              navigation={this.props.navigation}
              question={item}
            />
          )}
        />

        <Modal
          transparent={true}
          visible={this.state.isDraftDeletedModalVisible}
          onRequestClose={() => this.changeDraftDeletedModalVisibility(false)}
          animationType="fade"
        >
          <DraftDeletedPopUp
            changeDraftDeletedModalVisibility={this.changeDraftDeletedModalVisibility.bind(
              this
            )}
          />
        </Modal>
      </Container>
    );
  }
}
