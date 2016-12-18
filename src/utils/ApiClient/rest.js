
export default class Rest {

  get(baseUrl, params) {
    const url = baseUrl + '?' + this.paramsToQuery(params);
    console.log('[GET] ', url);
    return new Promise((success, error) => {
      let errorData = null;
      fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        errorData = {
          status: response.status,
          message: 'HTTP status error',
          response
        };
        throw errorData;
      }).then((response) => {
        if (!response) {
          errorData = {
            status: response.status,
            message: 'Data is null',
            response: null
          };
          throw errorData;
        }
        return response.json();
      })
      .then((response) => {
        console.log('Response of ' + url, response);
        success(response);
      })
      .catch((e) => {
        return error(e);
      });
    });
  }

  post(url, objParameters) {
    return new Promise((success, error) => {
      const params = this.paramsToQuery(objParameters);
      let errorData = null;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        errorData = {
          status: response.status,
          message: 'HTTP status error',
          response
        };
        throw errorData;
      })
      .then((response) => {
        if (!response) {
          errorData = {
            status: response.status,
            message: 'Data is null',
            response: null
          };
          throw errorData;
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
    });
  }

  paramsToQuery(object) {
    if (!object) {
      return '';
    }
    // eslint-disable-next-line prefer-const
    let out = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in object) {
      if (object[key] !== null && object[key] !== undefined) {
        out.push(key + '=' + encodeURIComponent(object[key]));
      }
    }
    return out.join('&');
  }
}
