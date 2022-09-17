import { useQuery } from "react-query"
import client from "./axios"
const baseURL = 'http://localhost:3001'
const fetchUsers = () => {
    return client.get(baseURL+'/users/getUsers')
}


const fetchTasks = () => {
    return client.get(baseURL+'/users/getTasks')
}

const fetchLogin = () =>{

    return client.get(baseURL+'/users/getUser')


}
export const useLogin = () => {

    return useQuery('login', fetchLogin,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}
export const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}


export const useTasksData = () => {
    return useQuery('tasks', fetchTasks,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}

export async function addTask(task) {

    const response = await client.post(
      baseURL + "/task/addTask",
      task
    );
  return response;
  
  
  }


