import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/v4'
})

// Default headers
instance.defaults.headers.common['Accept-Language'] = JSON.parse(localStorage.getItem('app-settings')).language

export default instance
