import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isLogged: true,
    setUsername: (username) => {set({ username })},
    setIsLogged : (isLogged) => {set({isLogged})}

}))

export default useStore
