import axios from "axios";

import { startGetCompany} from "../modules/ui/company/thunks";
import { checkingCredentials, login, logout } from "./authSlice"
import { clearCompany } from "../modules/ui/company/companyInfoSlice";

import config from "../../config";
import { userData } from "../../data/auth/userData";


/* OBJETIVO
  Este Thunk ejecutara funciones asincronas con el fin de cumplir varias tareas:
    1. Validar contra el API si las credenciales con correctas.
    2. Cambiar el state de authSlice seteando la información del usuario.
    3. En caso de no ser exitosa la consulta setear el mensaje de error igual en authSlice.
    4. Verificar si usuario tiene el atributo multicompany y segun eso hacer llamado a otro thunk
       que controle la logica de petición de las empresas y su selección.
    5. Hacer llamado al reducer Logout() y remover el token del sessionStorage.
    6. Petición al API para eliminar token de la base de datos.
*/


export const startLoginWithUserPassword = ({ username, password }) => {
  return async (dispatch) => {

    dispatch(checkingCredentials());

    /* NOTA
      Siendo una funcion asincrona checkingCredentials() cambia el estado de authSlice a "checking"
      lo que habilita el spinner de carga en las rutas publicas.
    */

    // Verificación de credenciales.
    try {
      //Posteo de las credenciales 
          //TODO Cambiar HardCode a realizar la petición del API 
            //const { data } = await axios.post(`${config.apiUrl}/usuarios/api-token-auth/`, { username, password })
            const {token} = userData;

      //Guarda el token de usuario en el sessionStorage del navegador.
      sessionStorage.setItem("Token", userData.token /* data.token */);

      //Seteo de la información al initialState authSlice.
      dispatch(login(userData))

      /* NOTA
        El dispatch(login()) cambia el estado a authenticated  lo que da paso a las rutas privadas 
        en AppRouter.jsx
      */

      // Petición, obtener compañias. 
      dispatch(startGetCompany()); 

    } catch (error) {

      //TODO Descomentar esto cuando este haciendo llamado al API
      /*const { data } = error.response;
      dispatch(logout(data)); */
      console.log(error)
      dispatch(logout(error))
      
      /* NOTA
        Si la petición llega a tener un erro lo atrapa y hace llamado al reduce logout(),
        el cual espera recibirlo para mostrarlo en pantalla.
      */
    }
  }
}

export const startLogout = () => {
  return async (dispatch, getState) => {
    //Extraer token del state de authSlice
    const { token } = getState().auth;

    //Eliminacion de token en Base de datos.
    //await axios.get(`${config.apiUrl}example/endpoint/deleteToken`, { headers: { Authorization: token } })

    //Eliminación de token en sessionStorage
    sessionStorage.removeItem("Token");

    //Limpiar las empresas guardadas 
    dispatch(clearCompany())

    // Cerrar sesión y eliminar datos
    dispatch(logout())
  }
}

