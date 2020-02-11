import API from "./API";

exports.uploadImages = (token, response) => {
    return new Promise((resolve, reject) => {
        const formdata = new FormData();

        formdata.append("photos[]", {
          uri: response.uri,
          name: response.fileName,
          type: "image/jpg"
        });
  
        API.post("/solicitation/file/upload", formdata, {
            headers: {
            Authorization: "Bearer " + token
            },
            Accept: "application/json",
            "Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d"
        })
            .then(function(response) {
            resolve(response.data);
            })
            .catch(function(error) {
            reject(error);
            });
        });
  };