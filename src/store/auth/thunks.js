import axios from "axios";
import config from "../../config";
import { checkingCredentials, logout } from "./authSlice"

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startLoginWithUserPassword = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const response = await axios.post(`${config.apiUrl}/api/token/`, { username, password })
      return response.data;
    } catch (error) {
      const {data } = error.response;
      dispatch(logout(data));
    }
  }
}