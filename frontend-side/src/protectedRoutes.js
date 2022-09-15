import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import { useEffect, useState } from "react";
import  useStore  from "./appStore";
import { useLocation } from "react-router-dom";
import { useLogin } from "./api/fetchAxios";

   
    

const ProtectedRoutes = () =>{
    const location = useLocation();
    const privateRoutes = ['/rating']


    const setUsername = useStore(state=> state.setUsername)
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
            }
            
            setIsVaild(true)
        }
        else{
        setIsVaild(false)
        }
      },[login.data]);
      console.log(isVaild);

      
    return isVaild ? <Outlet/> : <Login /> ; 
}

export default ProtectedRoutes;