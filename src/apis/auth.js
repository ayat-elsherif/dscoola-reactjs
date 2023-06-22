import * as axios from "axios";
import Configs from "../../config/config";
import { getlang } from "../../globals/globals";
import { store } from "../store";
const httpClient = axios.create();
httpClient.defaults.baseURL = "https://staging-api.dscoola.com/api/";
httpClient.defaults.timeout = 12000;

var accessToken = "";
var refreshToken = "";

httpClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch({ type: "LOGOUT_SUCCESS" });
      } else {
        return Promise.reject(error.response.data);
      }
    } else if (error.message) {
      //error.message
      return Promise.reject(error.message);
    }
  }
);

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function setRefreshToken(token) {
  refreshToken = token;
}

export function getRefreshToken() {
  return refreshToken;
}

export function setRequestHeader() {
  const token = localStorage.getItem("access_token");
  var lang = getlang();

  if (!token) {
    httpClient.defaults.headers.common["Authorization"] =
      "Basic " + btoa("web:test");
    httpClient.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded; charset=utf-8";
    httpClient.defaults.headers.common["Lang"] = `${lang}`;
  } else {
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    httpClient.defaults.headers.common["Lang"] = `${lang}`;
    httpClient.defaults.headers.post["Content-Type"] = null;
    httpClient.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  }
}

export function HtttpGetDefult(url, isLogin = false, isRefresh = false) {
  setRequestHeader(isRefresh, isLogin, url);
  return new Promise((resolve, reject) => {
    httpClient
      .get(Configs.getEndpoint + url)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function HtttpPostDefult(url, data) {
  setRequestHeader();
  return new Promise((resolve, reject) => {
    httpClient
      .post(Configs.getEndpoint + url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function HtttpDeleteDefult(url, data) {
  setRequestHeader();
  return new Promise((resolve, reject) => {
    httpClient
      .delete(Configs.getEndpoint + url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function HtttpPutDefult(url, data) {
  setRequestHeader();
  return new Promise((resolve, reject) => {
    httpClient
      .put(Configs.getEndpoint + url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function HtttpPatchDefult(url, data) {
  setRequestHeader();
  return new Promise((resolve, reject) => {
    httpClient
      .patch(Configs.getEndpoint + url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default httpClient;
