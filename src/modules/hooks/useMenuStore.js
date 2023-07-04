import { useDispatch, useSelector } from "react-redux";
import 
{ morgquickApi } from "../../api/morgquickApi";
import { decryptData } from "../../hooks/useEncrypData";
import { checkingAccess, getModules } from "../../store/modules/ui/menu/menuSlice";

export const useMenuStore = () => {

    const { status, modules } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    const startCreateMenu = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));

        dispatch(checkingAccess())
        try {
            const { data } = await morgquickApi.get(`/menu/asingUser/get/${decryptedData.id}`);
            dispatch(getModules(data))
        } catch (error) {
            console.log(error)
        }
    }

    return {

        /* Atributos */
        status,
        modules,
        /* Metodos */
        startCreateMenu,
    }
}
