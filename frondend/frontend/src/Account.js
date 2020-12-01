import Axios from 'axios'

const account = Axios.create(
{ 
    baseURL:"http://54.180.112.37/account/",
    timeout: 3000,
});
export default account;