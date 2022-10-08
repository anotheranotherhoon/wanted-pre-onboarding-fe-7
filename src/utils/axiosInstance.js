import axios from "axios";

const token = window.localStorage.getItem('token') || null

const axiosInstance = axios.create(
    {
    baseURL : process.env.REACT_APP_URL,
    'Content-Type' : 'application/json'
}
)

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`


export default axiosInstance