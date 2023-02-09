import axios from 'axios';

const apiURL = 'https://63e5206e8e1ed4ccf6ee6a9f.mockapi.io/';

export const apiClient = axios.create({
  baseURL: apiURL
});
