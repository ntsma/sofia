import API from './API';

module.exports = getAnsweredRequests = (token) => {
    return new Promise((resolve, reject) => {
        API.get('/solicitant/answered', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            resolve(response.data);

        })
        .catch(function(error) {
            reject(error);
        })
    });
};

module.exports = getSentRequests = (token) => {
    return new Promise((resolve, reject) => {
        API.get('/solicitant/sents', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            console.log(response.data);
            resolve(response.data);

        })
        .catch(function(error) {
            reject(error);
        })
    });
};