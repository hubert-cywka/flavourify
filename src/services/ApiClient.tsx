import axios from 'axios';

const apiURL = 'http://192.168.0.4:8080/';

export const apiClient = axios.create({
  baseURL: apiURL
});
