import client from "./axiosInterceptors";
import { useQuery } from "react-query";
import { baseURL } from "../Constant";
import { convertTaskElementToEventObject } from "../compoments/TaskModal";

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

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @param setEvents function pointer to setting the events in the calander.
 * @returns Custom query hook to fetch all the tasks of a user.
 */
const useTasksData = (isAdmin, setEvents) => {
  return useQuery("tasks", () => fetchTasks(isAdmin), {
    enabled: !isAdmin,
    onSuccess: (response) => {
      setEvents(convertTasksToEventArray(response.data));
    },
  });
};

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @param setEvents function pointer to setting the events in the calander.
 * @returns Custom query hook to fetch all the tasks of all the users.
 */
const useAdminTasksData = (isAdmin, setEvents) => {
  return useQuery("Admintasks", () => fetchTasks(isAdmin), {
    enabled: isAdmin,
    onSuccess: (response) => {
      setEvents(AllUsersToTasksArray(response.data));
    },
  });
};

export { useAdminTasksData, useTasksData };
