import create from 'zustand';


export const useStore = create(set=>({
    username: undefined,
    setUsername: (username) => {set({ username })
    console.log(username);
},
}))
export default useStore