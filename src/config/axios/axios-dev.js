import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL + "v4"
})

export default instance
