import { Outlet } from "react-router-dom";
import Login from "./Login";
import  useStore  from "../appStore";
import {  useLogin } from "../api/authAPI";
import Loading from "./animationsCompoments/LoadingComp";
   
    
const ProtectedRoutes=  () =>{
    const login = useLogin()
    const isLogged = useStore(state => state.isLogged);    
    if(login.isLoading) return <Loading/>
    
    return isLogged ? <Outlet/> : <Login />;
}

export default ProtectedRoutes;