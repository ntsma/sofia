import API from './API';

exports.checkEmailAndCPF = (email, cpf) => {
    return new Promise((resolve, reject) => {
        let formdata = new FormData();

        formdata.append("email", email);
        formdata.append("cpf", cpf);

        API.post('/check', formdata)
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        });
  
    });
  
}