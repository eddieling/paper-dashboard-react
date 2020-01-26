import axios from 'axios';
// Create axios instance
export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000,  
});

// instance.interceptors.request.use(async config => {
//   const session = await Auth.currentSession();
//   config.baseURL = 'https://user-mgmt-node.herokuapp.com';
//   return config;
// });
