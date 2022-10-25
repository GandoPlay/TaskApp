import create from 'zustand';

// type Employee={
//     username?: any;
//     isLogged?:boolean;
//     authFailed?:boolean;
//     isAdmin?:boolean;
//     isError?:boolean;
// }

const useStore = create(set => ({
    username: undefined,
    isLogged: false,
    authFailed: false,
    isAdmin: false,
    isError: false,

    setUsername: (username) => { set({ username }) },
    setIsLogged: (isLogged) => { set({ isLogged }) },
    setIsAdmin: (isAdmin) => { set({ isAdmin }) },
    setIsError: (isError) => { set({ isError }) },
    setAuthFailed: (authFailed => { set({ authFailed }) }

    )
}))

export default useStore
