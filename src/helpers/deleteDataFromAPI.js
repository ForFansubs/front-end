import axios from '../config/axios/axios'

export default async function deleteDataFromAPI({ route }) {
    return await axios.delete(route)
}