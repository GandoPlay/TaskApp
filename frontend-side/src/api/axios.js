import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://localhost:3001'

const client = axios.create({baseURL: "http:localhost:3001"})

export const requestWithAccessTokenAuthorization = ({...options}) =>{
    let access_token = JSON.parse(localStorage.getItem('accessToken'))
    client.defaults.headers.common.Authorization = `Bearer ${access_token}`
    
    const onSuccess = (response) => response
    const onError = (error) => {
      if(error.response.status ===401&&!error.config.__isRetryRequest){  
        error.config.__isRetryRequest = true
         window.location.reload();
        requestWithRefreshTokenAuthorization({ url: 'http://localhost:3001/auth/refresh' })
      }


    }
    return client(options).then(onSuccess).catch(onError)
}

export const requestWithRefreshTokenAuthorization = ({...options}) =>{
  let refresh_token = JSON.parse(localStorage.getItem('refreshToken'))
  client.defaults.headers.common.Authorization = `Bearer ${refresh_token}`

  const onSuccess = (response) => {
    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))

  }
  const onError = (error) => {
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}



export async function SignUpUserName(user) {
    const response = await axios.post(
      "http://localhost:3001/auth/signup",
      user
    );

    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))


    
    return response.data
  }