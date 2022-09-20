import client from "./axiosInterceptors";
import { useQuery } from "react-query"
import {baseURL} from '../Constant'
async function addTask(task) {

    const response = await client.post(
      baseURL + "/task/addTask",
      task
    );
  return response;
  
  
  }

  const fetchTasks = () => {
    return client.get(baseURL+'/users/getTasks')
}

 async function removeTask(id) {
    console.log(id);
    const response = await client.post(
      baseURL + "/task/RemoveTask",
      id
    );
  return response;
  
  
  }


  
  const useRemoveTasksData = (id) => {
    return useQuery('tasks', removeTask(id),{
      enabled: false,
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}

   const useTasksData = () => {
    return useQuery('tasks', fetchTasks,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}
export  {addTask, removeTask, useTasksData, useRemoveTasksData}