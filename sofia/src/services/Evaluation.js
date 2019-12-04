import API from './API';

exports.judgeRequestMadeByMe = (token, sastifaction, attendance, observation, solicitation_id) => {
    return new Promise((resolve, reject) => {
        let formdata = new FormData();

        formdata.append("satisfaction", sastifaction);
        formdata.append("attendance", attendance);
        formdata.append("avoided_forwarding", true);
        formdata.append("induced_forwarding", false);
        formdata.append("observation", observation);
        
        API.post('/solicitation/evaluate/' + solicitation_id, formdata, {
            headers: {
                Authorization: "Bearer " + token
            },           
        })
        .then(function(response) {
            resolve(response.data);

        })
        .catch(function(error) {
            reject(error);
        })
    });
};


exports.judgeRequest = (token, sastifaction, attendance, observation, solicitation_id) => {
    return new Promise((resolve, reject) => {
        let formdata = new FormData();

        formdata.append("sats", sastifaction);
        formdata.append("att", attendance);
        formdata.append("avoided_forwarding", true);
        formdata.append("induced_forwarding", false);
        formdata.append("observation", observation);
        formdata.append("answer_id", solicitation_id);
        
        API.post('/solicitation/bysearch/evaluate', formdata, {
            headers: {
                Authorization: "Bearer " + token
            },           
        })
        .then(function(response) {
            resolve(response.data);

        })
        .catch(function(error) {
            reject(error);
        })
    });
};
