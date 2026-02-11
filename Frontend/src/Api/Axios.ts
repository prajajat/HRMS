import axios from "axios";

 
const instance = axios.create({
  baseURL: 'http://localhost:8089',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});


export const login = async (data:any) =>
 await instance.post("/auth/login",data).then((res) => res);

axios.interceptors.request.use(config => {
config.headers.Authorization = `Bearer ${'c'}`;
return config;
});