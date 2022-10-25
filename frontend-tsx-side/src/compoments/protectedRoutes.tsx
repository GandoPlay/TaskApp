import { Outlet } from "react-router-dom";
import Login from "./Login";
import  useStore  from "../appStore";
import {  useLogin } from "../api/authAPI";
   
    type AppState={
users:[],
topUsers:[],
info:any

    }
type AppProp={
        
    }
const ProtectedRoutes=<AppProp,AppState>  () =>{
    const login = useLogin()
    const isLogged = useStore(state => state.isLogged);    
    return isLogged ? <Outlet/> : <Login />;
}

export default ProtectedRoutes;