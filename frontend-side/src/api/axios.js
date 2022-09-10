import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://localhost:3001'

const client = axios.create({baseURL: "http:localhost:3001"})

export const requestWithAuthorization = ({...options}) =>{
    refreshTokenRequest()
    let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    client.defaults.headers.common.Authorization = `Bearer ${authTokens.access_token}`

    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}


export async function refreshTokenRequest(){
  let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  const userData = jwt_decode(authTokens.access_token)
  const isExpired = dayjs.unix(userData.exp).diff(dayjs()) < 1;
  if(isExpired){
    const response = await axios.post(`${baseURL}/auth/refresh`,
      authTokens.refresh_token
    );
    localStorage.setItem('authTokens', JSON.stringify(response.data))
  }


}

export async function SignUpUserName(user) {
    const response = await axios.post(
      "http://localhost:3001/auth/signup",
      user
    );
    console.log(response.data);
    localStorage.setItem('authTokens', JSON.stringify(response.data))


    
    return response.data
  }