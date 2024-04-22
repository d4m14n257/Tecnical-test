import { createContext, ReactNode, useState } from "react";

export const UserLogin = createContext<any>({});

export const UserLoginContext = ({children} : {children : ReactNode}) => {
    const [username, setUsername] = useState<string>('');
    const [token, setToken] = useState<string>('');

    return (
        <UserLogin.Provider value={{username, token, setUsername, setToken}}>
            {children}
        </UserLogin.Provider>
    )
}