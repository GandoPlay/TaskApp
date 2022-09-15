import axios from 'axios'
import history from "../history";
const baseURL = 'http://localhost:3001'
const client = axios.create({ baseURL: baseURL })


 function NavigateTo(location){
  history.replace(location)
  history.go(0)
 }
 function authorizationRequest(config, tokenType){
    let token = JSON.parse(localStorage.getItem(tokenType))
    if (token) {
      if(config.defaults){
        config.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }

      else{
        config.headers['Authorization'] = 'Bearer ' + token

      }
    }
    else {
      if(tokenType === 'refreshToken'){
      // the refresh token is expired.
      NavigateTo('/')

      }
    }
  }



client.interceptors.request.use(
  config => {
    //the user is trying to get a new access token.
    if (config.url === '/auth/refresh') {
      
      authorizationRequest(config, 'refreshToken')
    }
    else {
      //the user is trying to reach the data with the access token.
      authorizationRequest(config, 'accessToken')
    }
    return config

  },
  error => {
    Promise.reject(error)
  }
)



client.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config
    //the user is trying to get a new access token but the refresh token has expired.
    if (error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
      NavigateTo('/')
      return Promise.reject(error)
    }
  
    // the user is trying to get data but his access token is not up to date.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return client.get('/auth/refresh').then(res => {
        if (res?.status === 201) {
           localStorage.setItem('accessToken', JSON.stringify(res.data.access_token))
          authorizationRequest(client, 'accessToken')
          return client(originalRequest)
        }
      })
    }
    return Promise.reject(error)
  }
)








export async function LoginUser(user){

  const response = await axios.post(
    baseURL + "/auth/login",
    user
  );
  if(response.data.access_token&&response.data.refresh_token){

    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
    NavigateTo('/rating')
  }
  

}

export async function SignUpUserName(user) {

  const response = await axios.post(
    baseURL + "/auth/signup",
    user
  );


  localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
  localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))
  NavigateTo('/rating')



}

export default client
