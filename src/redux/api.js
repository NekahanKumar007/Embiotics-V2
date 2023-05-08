import axios from "axios";

export const API = axios.create({baseURL: 'http://124.40.247.222:8080'});

export const setTokenHeader = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Basic ${token}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
    }
  };

