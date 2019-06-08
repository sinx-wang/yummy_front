/* eslint-disable no-console */

function Util() {
  const commonUrl = "http://127.0.0.1:8080/";

  const asyncHttpPost = (url, data) => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
    return new Promise((resolve, reject) => {
      fetch(commonUrl + url, {
        method: "POST",
        headers: headers,
        body: data
      })
        .then(response => response.json())
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          console.log("err: ", url, err);
          reject(err);
        });
    });
  };

  const asyncHttpGet = url => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
    return new Promise((resolve, reject) => {
      fetch(commonUrl + url, {
        method: "POST",
        headers: headers
      })
        .then(response => response.json())
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          console.log("err: ", url, err);
          reject(err);
        });
    });
  };
}

export default Util;
