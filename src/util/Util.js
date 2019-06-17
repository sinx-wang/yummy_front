/* eslint-disable no-console */

function Util() {
  const commonUrl = "http://127.0.0.1:8080/";

  const getUrl = url => {
    let uri = commonUrl + url;
    return uri;
  };
  Util.getUrl = getUrl;

  const asyncHttpPost = (url, param, succ, err, contentType) => {
    if (!contentType) contentType = "application/json";
    const headers = {};
    headers["content-type"] = contentType;
    headers["charset"] = "UTF-8";

    const params = {
      method: "post",
      // credentials: "include", // include, same-origin, *omit
      // mode: "cors", // no-cors, cors, *same-origin
      headers,
      body: param
    };

    fetch(getUrl(url), params)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(succ)
      .catch(err);
  };
  Util.asyncHttpPost = asyncHttpPost;

  const asyncHttpGet = (url, succ, err, contentType) => {
    if (!contentType) contentType = "application/x-www-form-urlencoded";

    const params = {
      method: "get",
      // credentials: "include", // include, same-origin, *omit
      // mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "content-type": contentType,
        charset: "UTF-8"
        // token: fkg.getAppItem("token")
      }
    };

    fetch(getUrl(url), params)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const json = response.json();
        return json;
      })
      .then(succ)
      .catch(err);
  };
  Util.asyncHttpGet = asyncHttpGet;
}

export default Util;
