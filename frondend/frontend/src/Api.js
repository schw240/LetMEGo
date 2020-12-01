import Axios from 'axios'

const api = Axios.create(
{ 
    //baseURL:"http://127.0.0.1:8000/api/",
    baseURL:"http://54.180.112.37/api/",
    timeout: 3000,
});
export default api;