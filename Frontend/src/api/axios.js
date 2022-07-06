import axios from "axios"

export default axios.create(
    {
        // testAxios chang it 
        baseURL: "https://api.wheretheiss.at/v1/satellites"
    }
)