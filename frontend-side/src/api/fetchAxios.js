import { useQuery } from "react-query"
import { requestWithAccessTokenAuthorization } from "./axios"
const baseURL = 'http://172.20.10.8:3001'

const fetchUsers = () => {
    
    return requestWithAccessTokenAuthorization({ url: baseURL+'/users/getUsers' })
}

export const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): null
        }
    })
}