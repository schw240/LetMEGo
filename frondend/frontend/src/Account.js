import Axios from 'axios'

const account = Axios.create(
{ 
    baseURL:"http://52.78.0.29/account/",
    timeout: 3000,
});
export default account;