import axios from 'axios'

const client = axios.create({baseURL: "http://172.20.10.8:3001"})

export const request = ({...options}) =>{
    client.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzE5ZTg1NzYyMDM2YzVmZDE3Mzc0ZTUiLCJ1c2VybmFtZSI6ImVyZ2VyZHJnIiwiaWF0IjoxNjYyNjQyMjYzLCJleHAiOjE2NjI2NDMxNjN9.hDHBBMqHy8K0l605cCENoQfyvnBxChi6phJ_8YfpiEo`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}