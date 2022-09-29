import axios from "axios";
import {baseURL} from '../Constant'
import {NavigateTo} from './NavigateTo'
import client from './axiosInterceptors'
import { useQuery } from "react-query"



 async function LoginUser(user){
    const response = await axios.post(  
      baseURL + "/auth/login",
      user
    );
    if(response.data.access_token&&response.data.refresh_token){
  
      localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
      localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
      NavigateTo('/dateTable')
       user.setAuthFailed(false)
    }
    else{
     user.setAuthFailed(true)
    }
    
  
  }
  
   async function SignUpUserName(user) {
  
    const response = await axios.post(
      baseURL + "/auth/signup",
      user
    );
  
  
    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
    NavigateTo('/dateTable')
  
  
  
  }


  const fetchLogin = () =>{

    return client.get(baseURL+'/users/getUser')


}
 const useLogin = () => {

    return useQuery('login', fetchLogin,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}

  export  {SignUpUserName, LoginUser, useLogin}