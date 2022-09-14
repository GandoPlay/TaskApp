import create from 'zustand';


const useStore = create(set=>({
    username: undefined,
    isVaild: true,
    setUsername: (username) => {set({ username })},
    setIsVaild : (isVaild) => {set({isVaild})}

}))



 export default  useStore