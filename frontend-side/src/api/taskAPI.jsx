import client from "./axiosInterceptors";
import { useQuery } from "react-query";
import { baseURL } from "../Constant";

async function addTask(task, isAdmim) {
  if (isAdmim) {
    return await client.post(baseURL + "/admin/addTask", task);
  }
  return await client.post(baseURL + "/task/addTask", task);
}

const fetchTasks = (isAdmin) => {
  let url = baseURL + "/users/getTasks";
  if (isAdmin) {
    url = baseURL + "/admin/allUsersTasks";
  }
  return client.get(url);
};

const fetchAdminUsers = () => {
  return client.get(baseURL + "/admin/userDetails");
};
async function removeTask(id, isAdmin) {
  let url = baseURL + "/task/RemoveTask";
  if(isAdmin){
    return await client.post(baseURL + "/admin/removeTask", id);
  }
  return await client.post(baseURL + "/task/RemoveTask", id);

}

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



const useRemoveTasksData = (id) => {
  return useQuery("tasksRemove", () => removeTask({ id: id }), {
    enabled: false,
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

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
