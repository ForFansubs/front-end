import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/v4'
})

export default instance
