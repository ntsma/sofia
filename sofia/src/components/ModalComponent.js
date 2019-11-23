import React, { Component } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class ModalComponent extends Component {

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.showConfirmation}>
          <View style={styles.Container}>
            <View style={styles.Modal}>
              {this.props.content}
              
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  Container: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Modal: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 50,
  },

  Button: {
    width: '80%',
    height: 46,
    backgroundColor: '#3c8dbc',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 4,
  },

})