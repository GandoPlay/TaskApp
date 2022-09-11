import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://localhost:3001'

const client = axios.create({baseURL: "http:localhost:3001"})

export const requestWithAccessTokenAuthorization = ({...options}) =>{
    let access_token = JSON.parse(localStorage.getItem('accessToken'))
    console.log('access token json' , access_token);
    console.log('access token ' , localStorage.getItem('accessToken'));
    client.defaults.headers.common.Authorization = `Bearer ${access_token}`
    // if(access_token==="undefined"){
    //   const response = requestWithRefreshTokenAuthorization({ url: 'http://localhost:3001/auth/refresh' })
    //   localStorage.setItem('accessToken', JSON.stringify(response.data))
    // }
    const onSuccess = (response) => response
    const onError = (error) => {
     requestWithRefreshTokenAuthorization({ url: 'http://localhost:3001/auth/refresh' })


    }
    return client(options).then(onSuccess).catch(onError)
}

export const requestWithRefreshTokenAuthorization = ({...options}) =>{
  let refresh_token = JSON.parse(localStorage.getItem('refreshToken'))
  console.log(refresh_token);
  client.defaults.headers.common.Authorization = `Bearer ${refresh_token}`

  const onSuccess = (response) => {
    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))

  }
  const onError = (error) => {
      console.log(`i tried with ${refresh_token}`);
      return error
  }
  return client(options).then(onSuccess).catch(onError)
}

// export async function refreshTokenRequest(){


//   }



export async function SignUpUserName(user) {
    const response = await axios.post(
      "http://localhost:3001/auth/signup",
      user
    );
    console.log(response.data.access_token);
    console.log(response.data.refresh_token);
    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))


    
    return response.data
  }