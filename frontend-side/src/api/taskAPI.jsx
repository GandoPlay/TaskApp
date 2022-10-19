import client from "./axiosInterceptors";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { baseURL } from "../Constant";
import { convertTaskElementToEventObject } from "../compoments/TaskModal";

/**
 *
 * @param task new task to append to the backend
 * @param isAdmin boolean, if the user is an Admin
 * @returns response to the post request of appending a new task.
 */
// async function addTask(task, isAdmim) {
//   if (isAdmim) {
//     return await client.post(baseURL + "/admin/addTask", task);
//   }
//   return await client.post(baseURL + "/task/addTask", task);
// }

async function addTask(user) {
  if (user.isAdmin) {
    return await client.post(baseURL + "/admin/addTask", user.task);
  }

  return await client.post(baseURL + "/task/addTask", user.task);
}

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns If isAdmin is true, get all the tasks of all the users. else, the tasks of a certain user.
 */
const fetchTasks = () => {
  let url = baseURL + "/users/getTasks";
  return client.get(url);
};

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns If isAdmin is true, get all the tasks of all the users. else, the tasks of a certain user.
 */
const fetchAdminTasks = () => {
  let url = baseURL + "/admin/allUsersTasks";
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
// const useAddTasksData = (task, isAdmin) => {
//   return useQuery("tasksAdd", () => addTask(task, isAdmin), {
//     enabled: task !== undefined,
//     select: (response) => {
//       return response.data
//         ? JSON.parse(JSON.stringify(response.data))
//         : undefined;
//     },
//   });
// };

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

const convertTasksToEventArray = (tasks, username = "") => {
  if (tasks && tasks.length > 0) {
    const eventsTask = [];
    tasks.forEach((element) =>
      eventsTask.push(convertTaskElementToEventObject(element, username))
    );
    return eventsTask;
  } else {
    return [];
  }
};

/**
 *
 * @param users the tasks from the backend(every user has a task array)==> {username: tasks[]}
 * @returns Events Array for all the users that exists.
 */
function AllUsersToTasksArray(users) {
  const eventsTask = [];
  users.forEach((user) =>
    eventsTask.push(...convertTasksToEventArray(user.tasks, user.username))
  );
  return eventsTask;
}

const useTasksData = (isAdmin, setEvents) => {
  return useQuery("tasks", () => fetchTasks(), {
    enabled: !isAdmin,
    onSuccess: (response) => {
      console.log(convertTasksToEventArray(response.data));
      setEvents(convertTasksToEventArray(response.data));
    },
  });
};

const useAdminTasksData = (isAdmin, setEvents) => {
  return useQuery("Admintasks", () => fetchAdminTasks(), {
    enabled: isAdmin,
    onSuccess: (response) => {
      console.log(AllUsersToTasksArray(response.data));
      setEvents(AllUsersToTasksArray(response.data));
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

const useAddTasksData = (isAdmin, setIsError) => {
  const queryClient = useQueryClient();
  const queryName = "tasks";
  return useMutation(addTask, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("tasks");
      queryClient.setQueryData(queryName, (oldQueryData) => {
        if (data.data.error) {
          setIsError(true);
          return oldQueryData;
        }
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

const useAdminAddTasksData = (isAdmin, setIsError) => {
  const queryClient = useQueryClient();
  const queryName = "Admintasks";
  return useMutation(addTask, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("tasks");
      queryClient.setQueryData(queryName, (oldQueryData) => {
        if (data.data.error) {
          setIsError(true);
          return oldQueryData;
        }
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
export {
  useAdminAddTasksData,
  convertTasksToEventArray,
  useUsersDetails,
  addTask,
  removeTask,
  useTasksData,
  useRemoveTasksData,
  useAddTasksData,
  useAdminTasksData,
};
