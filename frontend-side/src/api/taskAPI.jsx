import client from "./axiosInterceptors";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { baseURL } from "../Constant";
import { convertTaskElementToEventObject } from "../compoments/TaskModal";

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
async function fetchTasks(isAdmin) {
  const link = isAdmin ? "/admin/allUsersTasks" : "/users/getTasks";
  let url = baseURL + link;
  return await client.get(url);
}

const fetchAdminUsers = () => {
  return client.get(baseURL + "/admin/userDetails");
};

/**
 *
 * @param user boolean, if the user is an Admin
 * @returns response to the post Request of removing a task.
 */
async function removeTaskFromBackend(user) {
  if (user.isAdmin) {
    const data = await client.post(baseURL + "/admin/removeTask", {
      ownerId: user.ownerId,
      id: user.TaskId,
    });
    return data;
  }
  const data = await client.post(baseURL + "/task/RemoveTask", {
    id: user.TaskId,
  });
  return data;
}

// const useRemoveTasksData = (id, ownerId, isAdmin) => {
//   return useQuery("tasksRemove", () => removeTask(id, ownerId, isAdmin), {
//     enabled: false,
//     select: (response) => {
//       return response.data
//         ? JSON.parse(JSON.stringify(response.data))
//         : undefined;
//     },
//   });
// };
/**
 *
 * @param users array of all the users{username, tasks array, id}
 * @param newTask a new Task
 * @returns append the new task to the related user and send the updated array.
 */
function RemoveTask(users, deletedTask) {
  users.forEach((user) => {
    if (user.id === deletedTask.ownerId) {
      console.log(user.tasks);
      console.log(deletedTask);
      user.tasks = user.tasks.filter((task) => task._id !== deletedTask.id);
      return users;
    }
  });
  return users;
}

const useRemoveTasksDataMut = (isAdmin) => {
  const queryClient = useQueryClient();
  const queryName = isAdmin ? "Admintasks" : "tasks";
  return useMutation(removeTaskFromBackend, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryName, (oldQueryData) => {
        return {
          data: isAdmin
            ? RemoveTask(oldQueryData.data, data.data)
            : oldQueryData.data.filter((task) => task._id !== data.data.id),
        };
      });
    },
  });
};

/**
 *
 * @param tasks boolean, if the user is an Admin
 * @param username
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
  users.forEach((user) => {
    eventsTask.push(...convertTasksToEventArray(user.tasks, user.username));
  });
  return eventsTask;
}

const useTasksData = (isAdmin, setEvents) => {
  return useQuery("tasks", () => fetchTasks(isAdmin), {
    enabled: !isAdmin,
    onSuccess: (response) => {
      setEvents(convertTasksToEventArray(response.data));
    },
  });
};

const useAdminTasksData = (isAdmin, setEvents) => {
  return useQuery("Admintasks", () => fetchTasks(isAdmin), {
    enabled: isAdmin,
    onSuccess: (response) => {
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
    onSuccess: (data) => {
      queryClient.setQueryData(queryName, (oldQueryData) => {
        if (data.data.error) {
          setIsError(true);
          return oldQueryData;
        }
        return {
          data: isAdmin
            ? AppendTask(oldQueryData.data, data.data)
            : [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
export {
  useRemoveTasksDataMut,
  convertTasksToEventArray,
  useUsersDetails,
  addTask,
  useTasksData,
  useAddTasksData,
  useAdminTasksData,
};
