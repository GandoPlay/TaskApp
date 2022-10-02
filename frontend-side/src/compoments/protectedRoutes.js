import { Outlet } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import  useStore  from "../appStore";
import { useLocation } from "react-router-dom";
import { useLogin } from "../api/authAPI";
   
    

const ProtectedRoutes = () =>{
    const location = useLocation();
    const privateRoutes = ['/Rating','/dateTable']


    const setUsername = useStore(state=> state.setUsername)
    const setIsAdmin = useStore(state=> state.setIsAdmin)

    const isLogged = useStore(state=> state.isLogged)
    const setIsLogged = useStore(state=> state.setIsLogged)
    const [isVaild, setIsVaild] = useState(false);

    //check if the user already logged in so he won't get kicked from the site.
    const canStay = isLogged&&privateRoutes.includes(location.pathname)
    const login = useLogin()

    useEffect(() => {
        if(canStay|| login.data){
            if(login.data)
            {
                setIsLogged(true)
                setUsername(login.data.username)
                if(login.data.isAdmin){
                    setIsAdmin(login.data.isAdmin)

                }
            }
            
            setIsVaild(true)
        }
        else{
        setIsVaild(false)
        }
      },[login.data]);

      
    return isVaild ? <Outlet/> : <Login /> ; 
}

export default ProtectedRoutes;