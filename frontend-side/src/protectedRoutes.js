import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login/Login";
// import { Context } from './Context/context'
import { useContext } from 'react';
import { useStore } from "zustand";


const useAuth = () =>{
    const username = useStore(state=> state.username)
    console.log(username);
   return username!== undefined;
}
const ProtectedRoutes = () =>{
    // const {token} = useContext(Context);

    const isAuth = useAuth();
    console.log(isAuth);
    return isAuth ? <Outlet/> : <Login /> ; 
}
export default ProtectedRoutes;