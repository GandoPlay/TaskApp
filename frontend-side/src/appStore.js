import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isLogged: true,
    authFailed : false,
    isAdmin : false,

    setUsername: (username) => {set({ username })},
    setIsLogged : (isLogged) => {set({isLogged})},
    setIsAdmin: (isAdmin) => {set({ isAdmin })},
    setAuthFailed: (authFailed =>{set({authFailed})}

)}))

export default useStore
