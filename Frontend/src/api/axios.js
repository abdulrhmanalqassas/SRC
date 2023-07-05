import axios from "axios"

export default axios.create(
    {
        // testAxios chang it 
        baseURL: "http://127.0.0.1:5000"
    }
)

export const axiosPrivate = axios.create(
    {
        baseURL: "http://127.0.0.1:5000",
        headers: {'Content-Type' : 'application/json'},
        withCredentials: true
    }
)

export const SIGNIN_END_POINT = "/v1/auth/signIn/"
export const SIGNUP_END_POINT = "/v1/auth/signUp/"
export const REFRESH_END_POINT = "/v1/auth/refresh/"
export const AddContract_END_POINT = "/v1/blockchain/create_contract"
export const FORGOTTEN_PASS_END_POINT = "/v1/auth/forgot-password/"
export const RESET_PASS_END_POINT = "/v1/auth/reset-password/"


