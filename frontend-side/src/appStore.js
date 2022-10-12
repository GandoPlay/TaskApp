import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isLogged: true,
    authFailed : false,
    isAdmin : false,
    isError : false,

    setUsername: (username) => {set({ username })},
    setIsLogged : (isLogged) => {set({isLogged})},
    setIsAdmin: (isAdmin) => {set({ isAdmin })},
    setIsError: (isError) => {set({ isError })},
    setAuthFailed: (authFailed =>{set({authFailed})}

)}))

export default useStore
