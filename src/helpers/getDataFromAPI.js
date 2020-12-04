import axios from '../config/axios/axios'

export default async function getDataFromAPI({ route, limit }) {
    return await axios.get(route)
}