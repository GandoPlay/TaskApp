import client from "./axiosInterceptors";
import { useQuery } from "react-query";
import { baseURL } from "../Constant";

/**
 *
 * @param task new task to append to the backend
 * @param isAdmin boolean, if the user is an Admin
 * @returns response to the post request of appending a new task.
 */
async function addTask(task, isAdmim) {
  if (isAdmim) {
    return await client.post(baseURL + "/admin/addTask", task);
  }
  return await client.post(baseURL + "/task/addTask", task);
}

// async function addTask(user) {
//   if (user.isAdmim) {
//     return await client.post(baseURL + "/admin/addTask", user.task);
//   }
//   return await client.post(baseURL + "/task/addTask", user.task);
// }
/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns If isAdmin is true, get all the tasks of all the users. else, the tasks of a certain user.
 */
const fetchTasks = (isAdmin) => {
  console.log(isAdmin);
  let url = baseURL + "/users/getTasks";
  if (isAdmin) {
    url = baseURL + "/admin/allUsersTasks";
  }
  return client.get(url);
};

const fetchAdminUsers = () => {
  return client.get(baseURL + "/admin/userDetails");
};

/**
 *
 * @param TaskId string, id of the task
 * @param ownerId string, id of the owner
 * @param isAdmin boolean, if the user is an Admin
 * @returns response to the post Request of removing a task.
 */
async function removeTask(TaskId, ownerId, isAdmin) {
  let url = baseURL + "/task/RemoveTask";
  if (isAdmin) {
    return await client.post(baseURL + "/admin/removeTask", {
      ownerId: ownerId,
      id: TaskId,
    });
  }
  return await client.post(baseURL + "/task/RemoveTask", { id: TaskId });
}
/**
 *
 * @param task new task to append to the backend
 * @param isAdmin boolean, if the user is an Admin
 * @returns Custom react query hook that add a new task.
 */
const useAddTasksData = (task, isAdmin) => {
  return useQuery("tasksAdd", () => addTask(task, isAdmin), {
    enabled: task !== undefined,
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

const useRemoveTasksData = (id, ownerId, isAdmin) => {
  return useQuery("tasksRemove", () => removeTask(id, ownerId, isAdmin), {
    enabled: false,
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns Custom react query hook that gets all the tasks.
 */
const useTasksData = (isAdmin) => {
  return useQuery("tasks", () => fetchTasks(isAdmin), {
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

const useAdminTasksData = (isAdmin) => {
  return useQuery("Admintasks", () => fetchTasks(isAdmin), {
    enabled: isAdmin,
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns Custom react query hook that gets all the users{name, id}.
 */
const useUsersDetails = (isAdmin) => {
  return useQuery("adminUsers", () => fetchAdminUsers(), {
    enabled: isAdmin,
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};
export {
  useUsersDetails,
  addTask,
  removeTask,
  useTasksData,
  useRemoveTasksData,
  useAddTasksData,
  useAdminTasksData,
};
