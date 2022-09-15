import { Outlet } from "react-router-dom";
import Login from "./Login/Login";

import  useStore  from "./appStore";
import { useLocation } from "react-router-dom";
import { useLogin } from "./api/fetchAxios";
const privateRoutes = ['/rating']

const useAuth = () =>{
    const location = useLocation();
    const login = useLogin()
    

    const setUsername = useStore(state=> state.setUsername)
    if(privateRoutes.includes(location.pathname)|| login.data){
        if(login.data)
        {
            setUsername(login.data.username)
        }
        return true;
    }
    return false

}
const ProtectedRoutes = () =>{

    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Login /> ; 
}
export default ProtectedRoutes;