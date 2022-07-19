import axios from "axios"

export default axios.create(
    {
        // testAxios chang it 
        baseURL: "http://127.0.0.1:5000"
    }
)