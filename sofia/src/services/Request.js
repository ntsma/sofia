import API from './API';

exports.getAnsweredRequests = (token) => {
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

exports.getSentRequests = (token) => {
    return new Promise((resolve, reject) => {
        API.get('/solicitant/sents', {
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

exports.getCanceledRequests = (token) => {
    return new Promise((resolve, reject) => {
        API.get('/solicitant/rejects', {
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