import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions, Button} from 'react-native';

export default class QuestionSentPopUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
    };
    Dimensions.addEventListener('change', (e) => {
      this.setState(e.window);
    });
  }



closeRateModal = () => {
  this.props.changeModalRateVisibility(false);
}

render(){
  return(
    <TouchableOpacity activeOpacity={1} disabled={true} style={styles.contentContainer}>
      <View style={styles.modal}>
      <TouchableHighlight onPress={() => this.closeRateModal()} style={styles.closeButtonText}>
        <Text>x</Text>
      </TouchableHighlight>
        <View style={styles.textView}>
          <Text style={styles.text}>Avaliação enviada!</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableHighlight onPress={() => this.closeRateModal()} style={styles.touchableHighlight}>
            <Text style={styles.okText}>OK</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  )
}

}


const styles = StyleSheet.create ({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'30%',

    //  borderRadius: 20,
    //  paddingBottom:'25%',
    //  position:'',
  },
  modal: {
    margin: '10%',
    height: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
    paddingTop: 10,
    alignSelf : 'center',
    alignItems: 'center',
    textAlign: 'center',

    backgroundColor:'white',
    borderRadius: 17.5,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  okText: {
    //paddingVertical: 10,
    //paddingLeft: '50%',
    padding: 10,
    width:'80%',
    textAlign: 'center',
    backgroundColor:'#3c8dbc',
    color: 'white',
    borderRadius: 10,
  },
  touchableHighlight:{
    flex: 1,
    paddingVertical: 10,
    alignSelf : 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius: 10,
  },
  textView: {
    alignItems:'center',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    alignSelf : 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    backgroundColor:'red',
    //borderColor: '#fff',
    paddingVertical: 10,
    alignSelf : 'flex-end',
    position: 'absolute',
    backgroundColor:'red',
    borderWidth:1,
    borderColor:'rgba(243,38,19,1)', //rgba(242, 38, 19, 1)
    alignItems:'center',
    justifyContent:'center',
    width:25,
    height:25,
    backgroundColor:'rgba(243,38,19,1)',
    borderRadius:17.5,
  }
});
