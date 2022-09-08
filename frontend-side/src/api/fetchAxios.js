import { useQuery } from "react-query"
import { request } from "./axios"
const fetchUsers = () => {
    return request({ url: 'http://172.20.10.8:3001/users/getUsers' })
}

export const useUsersData = (onSuccess, onError) => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            console.log(response);
            return response.data
        }
    })
}