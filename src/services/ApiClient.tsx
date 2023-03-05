import axios from 'axios';

const apiURL = 'http://192.168.19.189:8080/';

export const apiClient = axios.create({
  baseURL: apiURL
});
