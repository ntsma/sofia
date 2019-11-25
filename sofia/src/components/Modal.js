import React, {Component} from 'react';
import { BackHandler, Dimensions, Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default class ModalExample extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { 
      this.setModalVisible(true); 
      return true; 
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.Background}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.Modal}>
            <View style={styles.Container}>
              <Text style={{ color: '#4d4d4d', fontSize: 24, fontWeight: '600' }}>Um modal bonito!</Text>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ color: '#FFF' }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ color: '#FFF' }}>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({

  Background: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Button: {
    width: '80%',
    height: 54,
    backgroundColor: '#0080ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  Modal: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Container: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

})