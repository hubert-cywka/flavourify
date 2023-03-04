import axios from 'axios';

const apiURL = 'http://localhost:8080/';

export const apiClient = axios.create({
  baseURL: apiURL
});
