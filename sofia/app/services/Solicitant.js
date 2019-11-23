import API from './API';

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        API.post('/login', {
            email: email,
            password: password 
        })
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        });
  
    });
  
}

export default login;