import AsyncStorage from '@react-native-community/async-storage';

/*Obtendo as questões rascunhos para a Sofia pelo Token*/
module.exports = async getDraftIssues() {
  const token = await AsyncStorage.getItem("token");

  console.debug("OBTENDO O TOKEN DE ACESSO...");
  console.debug("TOKEN: " + token);

  return fetch('http://plataforma.homolog.huufma.br/api/solicitant/drafts', {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + token
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.debug("OBTENDO QUESTÕES RASCUNHOS...");
    console.debug("QUESTÕES");
    console.debug(responseJson.data.data);

    this.setState({"draftIssues": responseJson.data.data});
  })
  .catch((error) => {
    console.error(error);
  });

}
