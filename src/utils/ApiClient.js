
export default class ApiClient {

  get(url, params) {
    url = url + "?" + this.paramsToQuery(params);
    console.log('[GET] ', url);
    return new Promise(function(success, error){
      fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = {
            status: response.status,
            message: 'HTTP status error',
            response: response
          }
          throw error;
        }
      })
      .then((response) => {
        if(!response) {
          var error = {
            status: response.status,
            message: 'Data is null',
            response: null
          }
          throw error;
        }
        return response.json();
      })
      .then(function(response){
        console.log('Response of ' + url, response);
        success(response);
      })
      .catch((e) => {
        return error(e);
      });
    })
  }

  post(url, params){
    return new Promise(function(success, error){
      params = this.paramsToQuery(params);
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = {
            status: response.status,
            message: 'HTTP status error',
            response: response
          }
          throw error;
        }
      })
      .then((response) => {
        if(!response) {
          var error = {
            status: response.status,
            message: 'Data is null',
            response: null
          }
          throw error;
        }
        return response.json();
      })
      .then((response) => {
        console.log('Response of ' + url, response);
        return success(response);
      })
      .catch((e) => {
        console.error(e);
        return error(e);
      });
    })
  }

  paramsToQuery(object){
    if(!object)
      return '';
    let out = [];
    for (let key in object) {
      if(object[key] != null && object[key] != undefined)
        out.push(key + '=' + encodeURIComponent(object[key]));
    }
    return out.join('&');
  }
}
