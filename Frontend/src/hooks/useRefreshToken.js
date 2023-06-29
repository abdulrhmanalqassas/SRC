import React from "react"
import axios , {REFRESH_END_POINT} from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = ()=> {
    const {setAuth} = useAuth()

    const refreshToken = async ()=>{
        const response = await axios.get(REFRESH_END_POINT  , {
            withCredentials : true
        })
        
        setAuth(prev => {
            console.log(`this is the prev useAuth : ${prev}`)
            console.log(`this is the response from axios  : ${response.data}`)
            return {...prev , accessToken :response.data.accessToken }
        })

        return response.data.accessToken
        
    }

    return refreshToken
}



export default useRefreshToken