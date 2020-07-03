import axios from 'axios'

//Preencher o endereço da api
const api = axios.create({
    baseURL: 'http://192.168.15.15:3001/api'
})

export default api