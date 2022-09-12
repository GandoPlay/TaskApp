import create from 'zustand';

// type State = {
//     username: String
//     setUsername: (username) => void,
// };
// export const useAppStore = create <State>(set=>({
//     username: 'None',
//     setUsername:(username) => set(state=> ({}))
// }))


const useStore = create(set=>({
    username: undefined,
    setUsername: (username) => set((state)=>({username: username})),
}))
export default useStore