import axios from 'axios'
 const api = axios.create({

    baseURL:'http://covid-checker.sintegrada.com.br/api/',
})
export default api;