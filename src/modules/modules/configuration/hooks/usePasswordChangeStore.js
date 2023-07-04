import { useDispatch, useSelector } from "react-redux"
import { confirmLogout, sendErrorMessage, sendServerErrorMessage, savingChanges } from "../../../../store/modules/configuration/changePassword/changePasswordSlice";
import 
{ morgquickApi } from "../../../../api/morgquickApi";

export const usePasswordChangeStore = () => {

  const { isSaving, messageError, confirm, serverErrorMessage } = useSelector(state => state.changePassword);

  const dispatch = useDispatch();

  const startChangePassword = async (value) => {
    dispatch(savingChanges());
    try {
      await morgquickApi.post('/authMorg/user/changePass', value);
      dispatch(confirmLogout())
    }
    catch (error) {
      if (error.response.status == 400) {
        var claves = Object.keys(error.response.data);
        var firstValue = error.response.data[claves[0]];
        dispatch(sendErrorMessage(firstValue[0]))
      } else {
        dispatch(sendServerErrorMessage(error.response.data.error))
      }
    }
  }

  return {
    /* Atributos */
    isSaving,
    messageError,
    confirm,
    serverErrorMessage,

    /* Metodos */
    startChangePassword,
  }
}