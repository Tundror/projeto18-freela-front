import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [cityId, setCityId] = useState("")
    
    return(
        <UserContext.Provider value={{cityId, setCityId}}>
            {children}
        </UserContext.Provider>
    )
}
