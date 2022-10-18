import axios from "axios";
import { baseURL } from "../Constant";
import { NavigateTo } from "./NavigateTo";
import client from "./axiosInterceptors";
import { useQuery } from "react-query";

/**
 *
 * @param user the data of the user
 * @description The function make a post request to the login route. if the authorization succeed, it updates the local storage with the tokens.
 */
async function LoginUser(user) {
  //making a post request to login into the web application.
  const response = await axios.post(baseURL + "/auth/login", user);
  //check if the user got authorization from the server with access and refresh token
  if (response.data.access_token && response.data.refresh_token) {
    //setting the tokens in local storage
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.access_token)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response.data.refresh_token)
    );
    //navigate to the dateTable route.
    NavigateTo("/dateTable");
    //the  authorization has succed
    user.setAuthFailed(false);
  } else {
    //the  authorization has failed

    user.setAuthFailed(true);
  }
}

async function SignUpUserName(user) {
  const response = await axios.post(baseURL + "/auth/signup", user);

  localStorage.setItem(
    "accessToken",
    JSON.stringify(response.data.access_token)
  );
  localStorage.setItem(
    "refreshToken",
    JSON.stringify(response.data.refresh_token)
  );
  NavigateTo("/dateTable");
}

const fetchLogin = () => {
  return client.get(baseURL + "/users/getUser");
};
const useLogin = () => {
  return useQuery("login", fetchLogin, {
    select: (response) => {
      return response.data
        ? JSON.parse(JSON.stringify(response.data))
        : undefined;
    },
  });
};

export { SignUpUserName, LoginUser, useLogin };
