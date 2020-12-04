import axios from 'axios'
import defaultUser from '../localStorage/user'

const instance = axios.create({
    baseURL: '/api'
})

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = defaultUser.token || undefined

    return config
})

export default instance
