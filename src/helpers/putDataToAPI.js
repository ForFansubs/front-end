import axios from '../config/axios/axios'

export default async function putDataToAPI({ route }) {
    return await axios.put(route)
}