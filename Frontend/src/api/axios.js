import axios from "axios"

export default axios.create(
    {
        // testAxios chang it 
        baseURL: "http://192.168.1.4:5000/"
    }
)