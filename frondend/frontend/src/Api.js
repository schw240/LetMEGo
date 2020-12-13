import Axios from 'axios'

const api = Axios.create(
{   
    //http://52.78.0.29/api/
    //baseURL:"http://127.0.0.1:8000/api/",
    baseURL:"http://52.78.0.29/api/",
    timeout: 3000,
});
export default api;