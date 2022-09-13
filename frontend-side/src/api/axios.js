import axios from 'axios'


const baseURL = 'http://172.20.10.8:3001'
const client = axios.create({baseURL: baseURL})
client.interceptors.request.use(
  config => {
    let access_token = JSON.parse(localStorage.getItem('accessToken'))
    if (access_token) {
      config.headers['Authorization'] = 'Bearer ' + access_token
    }
    // config.headers['Content-Type'] = 'application/json';
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

    if (error.response?.status === 401 && originalRequest.url === baseURL+'auth/refresh') {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      let refresh_token = JSON.parse(localStorage.getItem('refreshToken'))
      return client
        .post('/auth/refresh', {
          refresh_token: refresh_token
        })
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem('accessToken', JSON.stringify(res.data.access_token))
            
            let access_token = JSON.parse(localStorage.getItem('accessToken'))

            client.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
            return client(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  }
)


export default client







// const client = axios.create({baseURL: baseURL})
// export const requestWithAccessTokenAuthorization = ({...options}) =>{
//     let access_token = JSON.parse(localStorage.getItem('accessToken'))
//     client.defaults.headers.common.Authorization = `Bearer ${access_token}`
    
//     const onSuccess = (response) =>  response
//     const onError = (error) => {
//       if(error.response.status ===401&&!error.config.__isRetryRequest){  
//         error.config.__isRetryRequest = true
//         requestWithRefreshTokenAuthorization({ url: baseURL+'/auth/refresh' })
//         console.log('HERE');
//         return error.config
//       }


//     }
//     return client(options).then(onSuccess).catch(onError)
// }

// export const requestWithRefreshTokenAuthorization = ({...options}, req) =>{
//   let refresh_token = JSON.parse(localStorage.getItem('refreshToken'))
//   client.defaults.headers.common.Authorization = `Bearer ${refresh_token}`

//   const onSuccess = (response) => {
//     localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))

//   }
//   const onError = (error) => {
//     return error
//   }
//   return client(options).then(onSuccess).catch(onError)
// }



export async function SignUpUserName(user) {
    const response = await axios.post(
      baseURL+"/auth/signup",
      user
    );

    localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh_token))


    
    return response.data
  }