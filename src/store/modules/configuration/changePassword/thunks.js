import axios from "axios";
import config from "../../../../config";
import { startLogout } from "../../../auth/thunks"
import { savingChanges, sendErrorMessage, sendServerErrorMessage } from "./changePasswordSlice";

export const startChangePassowrd = (value) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        dispatch(savingChanges());
        try {
            await axios.post(`${config.apiUrl}/authMorg/user/changePass`, value, { headers: { Authorization: token } })
            /* dispatch(startLogout()); */
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
}