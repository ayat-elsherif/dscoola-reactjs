import axios from "axios";
const accessToken = localStorage.getItem("access_token");



export default axios.create({
  baseURL: "https://staging-api.dscoola.com/api",
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "multipart/form-data",
  },
  //   credentials: "include",
  //   withCredentials: "include",
});

/* for auth request */

export const authAxios = axios.create({
  baseURL: "https://staging-api.dscoola.com/api/",

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "multipart/form-data",
  },
});

//////////

export const protectAxios = () => {
const accessToken = localStorage.getItem("access_token");
 return axios.create({
    baseURL: "https://staging-api.dscoola.com/api/",
    
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "multipart/form-data",
    },
  });
} 
