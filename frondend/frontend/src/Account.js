import Axios from 'axios'

const account = Axios.create(
{ 
    baseURL:"http://127.0.0.1:8000/account/",
    timeout: 3000,
});
export default account;