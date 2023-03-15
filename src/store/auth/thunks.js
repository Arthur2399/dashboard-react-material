import axios from "axios";
import config from "../../config";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startLoginWithUserPassword = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const { data } = await axios.post(`${config.apiUrl}/usuarios/api-token-auth/`, { username, password })
      window.sessionStorage.setItem("Token",data.token);
      /*
        Si data.multicompany es true se debe cambiar el estato de companyInfoSlice en 'selected'
        De alguna forma debemos hacer un peticion para verificar cuales son la companias que tiene este usuario
        para ello debes crar un thunk de peticion. Simula por ahora los datos para hacer la prueba
      */





      return dispatch(login({...data,multicompany:false})) // El multicompany lo debe enviar el API
    } catch (error) {
      const { data } = error.response;
      dispatch(logout(data));
    }
  }
}