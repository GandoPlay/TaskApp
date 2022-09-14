import { Outlet } from "react-router-dom";
import Login from "./Login/Login";

import  useStore  from "./appStore";


const useAuth = () =>{
    const isVaild = useStore(state=> state.isVaild)
    return true;
}
const ProtectedRoutes = () =>{

    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Login /> ; 
}
export default ProtectedRoutes;