import { useMutation, useQueryClient } from "react-query";
import { baseURL } from "../../Constant";
import client from "../axiosInterceptors";

/**
 *
 * @param user user object contains if the user is Admin, his username and the new task.
 * @returns The response from the server to the post request of adding a new task.
 */
async function addTask(user) {
  console.log(user);
  if (user.isAdmin) {
    return await client.post( "/admin/addTask", user.task);
  }

  return await client.post( "/task/addTask", user.task);
}
/**
 *
 * @param users array of all the users{username, tasks array, id}
 * @param newTask a new Task
 * @returns append the new task to the related user and send the updated array.
 */
function AppendTask(users, newTask) {
  users.forEach((user) => {
    if (user.id === newTask.owner) {
      user.tasks.push(newTask);
      return users;
    }
  });
  console.log(users);
  
  return users;
}
/**
 *
 * @param isAdmin isAdmin boolean, if the user is an Admin
 * @param setIsError pointer to setIsError function
 * @returns Custom Mutation hook to post tasks to the backend
 */
const useAddTasksData = (isAdmin, setIsError) => {
  const queryClient = useQueryClient();
  const queryName = isAdmin ? "Admintasks" : "tasks";
  return useMutation(addTask, {
    onSuccess: (response) => {
      queryClient.setQueryData(queryName, (oldQueryData:any) => {
        if (response.data.error) {
          setIsError(true);
          return oldQueryData;
        }
        return {
          data: isAdmin
            ? AppendTask(oldQueryData.data, response.data)
            : [...oldQueryData.data, response.data],
        };
      });
    },
  });
};
export default useAddTasksData;
