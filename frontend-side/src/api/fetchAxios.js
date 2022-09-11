import { useQuery } from "react-query"
import { requestWithAccessTokenAuthorization } from "./axios"
const fetchUsers = () => {
    return requestWithAccessTokenAuthorization({ url: 'http://localhost:3001/users/getUsers' })
}

export const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): null
        }
    })
}