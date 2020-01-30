import axios from 'axios';
// Create axios instance
export const instance = axios.create({
  baseURL: 'http://157.230.252.4:7001',
  timeout: 15000,  
});

// instance.interceptors.request.use(async config => {
//   const session = await Auth.currentSession();
//   config.baseURL = 'https://user-mgmt-node.herokuapp.com';
//   return config;
// });
