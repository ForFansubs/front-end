import axios from '../config/axios/axios'

export default async function postDataToAPI({ route, data }) {
    return await axios.post(route, data)
}