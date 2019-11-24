import API from './API';

const getAnsweredRequests = (token) => {
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
}

export default getAnsweredRequests;