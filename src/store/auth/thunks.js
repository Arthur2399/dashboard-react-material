import axios from "axios";
import config from "../../config";
import { startGetCompanies } from "../modules/ui/company/thunks";
import { checkingCredentials, login, logout } from "./authSlice"


/* OBJETIVO
  Este Thunk ejecutara funciones asincronas con el fin de cumplir varias tareas:
    1. Validar contra el API si las credenciales con correctas.
    2. Cambiar el state de authSlice seteando la información del usuario.
    3. En caso de no ser exitosa la consulta setear el mensaje de error igual en authSlice.
    4. Verificar si usuario tiene el atributo multicompany y segun eso hacer llamado a otro thunk
       que controle la logica de petición de las empresas y su selección.
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
      const { data } = await axios.post(`${config.apiUrl}/usuarios/api-token-auth/`, { username, password })

      //Guarda el token de usuario en el sessionStorage del navegador.
      sessionStorage.setItem("Token", data.token);
      
      //IMPORTANTE: Esto es una simulación, se debe pedir al Backend el dato que falta. 
      const dataTest = { ...data, multicompany: true } // El multicompany lo debe enviar el API.

      //Seteo de la información al initialState authSlice.
      dispatch(login(dataTest))

      /* NOTA
        El dispatch(login()) cambia el estado a authenticated  lo que da paso a las rutas privadas 
        en AppRouter.jsx
      */

      //Validación de multicompany
      if (dataTest.multicompany === true) return dispatch(startGetCompanies());

      /* NOTA
        Si la data que retorna el API tiene el atributo multiempresa en true, hace el llamado al thunk
        startCompanies que contiene otra logica para traer la empresas, caso contrario no realiza nada.
      */

    } catch (error) {
      const { data } = error.response;
      dispatch(logout(data));
      /* NOTA
        Si la petición llega a tener un erro lo atrapa y hace llamado al reduce logout(),
        el cual espera recibirlo para mostrarlo en pantalla.
      */
    }
  }
}