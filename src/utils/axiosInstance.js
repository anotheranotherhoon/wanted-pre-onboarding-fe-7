import axios from "axios";

console.log(process.env.REACT_APP_URL)
const axiosInstance = axios.create(
    {
    baseURL : process.env.REACT_APP_URL,
    'Content-Type' : 'application/json'
}
)

export default axiosInstance