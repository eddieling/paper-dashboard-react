import axios from 'axios';
import { Auth } from 'aws-amplify';
// Create axios instance
export const instance = axios.create({
  baseURL: '',
  timeout: 15000,  
});

// instance.interceptors.request.use(async config => {
//   const session = await Auth.currentSession();
//   config.baseURL = 'https://user-mgmt-node.herokuapp.com';
//   return config;
// });
