import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isVaild: true,
    setUsername: (username) => {set({ username })},
    setIsLogged : (isLogged) => {set({isLogged})}

}))

export default useStore
