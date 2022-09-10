import { useQuery } from "react-query"
import { requestWithAuthorization } from "./axios"
const fetchUsers = () => {
    return requestWithAuthorization({ url: 'http://localhost:3001/users/getUsers' })
}

export const useUsersData = (onSuccess, onError) => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data
        }
    })
}