import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL + "v4"
})

// Default headers
instance.defaults.headers.common['Accept-Language'] = JSON.parse(localStorage.getItem('app-settings')).language

export default instance
