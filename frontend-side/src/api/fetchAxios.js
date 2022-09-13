import { useQuery } from "react-query"
import { requestWithAccessTokenAuthorization } from "./axios"
import client from "./axios"

const baseURL = 'http://localhost:3001'
const fetchUsers = () => {
    
    return client.get(baseURL+'/users/getUsers')
    //return requestWithAccessTokenAuthorization({ url: baseURL+'/users/getUsers' })
}

export const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): null
        }
    })
}