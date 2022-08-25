import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login/Login";
// import { Context } from './Context/context'
import { useContext } from 'react';


const useAuth = () =>{
   return true;
}
const ProtectedRoutes = () =>{
    // const {token} = useContext(Context);

    const isAuth = useAuth();
    console.log(isAuth);
    return isAuth ? <Outlet/> : <Login /> ; 
}
export default ProtectedRoutes;