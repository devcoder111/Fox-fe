import axios from 'axios';
// import router from '@/router';
import config from './config'

const axiosApi = axios.create({
  baseURL: config.apiBaseUrl
});

export default class APIService {
  get(url, headers = {}, responseType = 'json') {
    let token = localStorage.getItem("token");
    return axiosApi.get(url, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      },
      responseType: responseType,
      data: {},
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          // this.$router.push({ name: 'SignIn' });
          throw e.response;
        }
        throw e.response;
      });
  }

  post(url, content, headers = {}, responseType = 'json') {
    let token = localStorage.getItem("token");
    return axiosApi.post(url, content, {
      headers: {
        ...headers,
        Authorization: "bearer " + token
      },
      responseType: responseType
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          throw e.response;
        }
        throw e.response;
      });
  }

  put(url, content, headers = {}) {
    let token = localStorage.getItem("token");
    return axiosApi.put(url, content, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          throw e.response;
        }
        throw e.response;
      });
  }

  patch(url, content, headers = {}) {
    let token = localStorage.getItem("token");

    return axiosApi.get(url, content, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          throw e;
        }
        throw e;
      });
  }

  delete(url, content = {}, headers = {}) {
    let token = localStorage.getItem("token");

    return axiosApi.delete(url, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      },
      data: content
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          throw e.response;
        }
        throw e.response;
      });
  }
}
