const fetch = require("node-fetch");

/*Obtendo todas as questões respondidas*/
module.exports.get = (token) => {
    var answeredIssues = [];
    fetch('http://sofia.huufma.br/api/solicitant/answered', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      answeredIssues = responseJson.data;

      answeredIssues = ["eduardo"]

    })
    .catch((error) => {
      console.error(error);
      return "Erro"
    });

    return answeredIssues;
}
