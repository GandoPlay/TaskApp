import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isLogged: true,
    authFailed : false,
    setUsername: (username) => {set({ username })},
    setIsLogged : (isLogged) => {set({isLogged})},
    setAuthFailed: (authFailed =>{set({authFailed})}

)}))

export default useStore
