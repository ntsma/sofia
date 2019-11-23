import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#FFF',
      padding: 30,
    },
  
    header: {
      flexDirection: 'row',
      marginBottom: 100,
    },
  
    logo: {
      width: 100,
      height: 100,
    },
  
    text: {
      color: "black",
      marginTop: 20,
      width: 200,
      textAlign: "center",
      opacity: 0.8,
      fontSize: 50
    },
  
    input: {
      height: 46,
      width: '100%',
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15,
    },
  
    hidePassword: {
      flexDirection: 'row',
      height: 46,
      width: '100%',
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15,
    },
  
    iconPassword: {
      paddingTop: 7,
    },
  
    inputPassword: {
      flex: 1
    },
  
    button: {
      height: 46,
      backgroundColor: '#3c8dbc',
      borderRadius: 4,
      marginTop: 20,
      alignSelf: 'stretch',
      justifyContent:'center',
      alignItems: 'center',
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    }
  });

  export default styles;