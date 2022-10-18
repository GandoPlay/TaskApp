import { useQuery } from "react-query"
import client from "./axiosInterceptors"
const baseURL = 'http://localhost:3001'
const fetchUsers = () => {
    return client.get(baseURL+'/users/getUsers')
}




/**
 *
 * @returns Custom react query hook that gets all the users in a ordered list.
 */
export const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}


export default useUsersData




