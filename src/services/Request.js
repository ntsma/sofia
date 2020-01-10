import API from "./API";

exports.getAnsweredRequests = token => {
  return new Promise((resolve, reject) => {
    API.get("/solicitant/answered", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.getSentRequests = token => {
  return new Promise((resolve, reject) => {
    API.get("/solicitant/sents", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.getCanceledRequests = token => {
  return new Promise((resolve, reject) => {
    API.get("/solicitant/rejects", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.getDraftRequests = token => {
  return new Promise((resolve, reject) => {
    API.get("/solicitant/drafts", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.sendRequest = (token, description, file_ids) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "send");
    formdata.append("description", description);
    formdata.append("mobile", 1);
    formdata.append("file_ids", file_ids);

    API.post("/solicitation/handle", formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.updateRequest = (token, description) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "send");
    formdata.append("description", description);

    API.post("/solicitation/" + item.id, formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.searchRequests = (token, description) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("description", description);

    API.post("/solicitation/search", formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.sendDraftRequest = (token, description, file_ids) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "draft");
    formdata.append("description", description);
    formdata.append("mobile", 1);
    formdata.append("file_ids", file_ids);

    API.post("/solicitation/handle", formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.updateDraftRequest = (token, description, id) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "draft");
    formdata.append("description", description);
    formdata.append("mobile", 1);

    API.post("/solicitation/" + id, formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.deleteDraftRequest = (token, id) => {
  return new Promise((resolve, reject) => {
    API.get("/solicitation/destroy/" + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.getCBO = token => {
  return new Promise((resolve, reject) => {
    API.get("/cbo/list", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.getRequest = (token, id) => {
  return new Promise((resolve, reject) => {
    API.get("/answer/read/" + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

exports.sendForwardRequest = (token, description, file_ids) => {
  return new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("type_id", 52);
    formdata.append("mode", "send");
    formdata.append("description", description);
    formdata.append("mobile", 1);
    formdata.append("file_ids", file_ids);

    API.post("/solicitation/handle", formdata, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};