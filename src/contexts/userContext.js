import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [cityId, setCityId] = useState("")
    const [ticketId, setTicketId] = useState("")
    const [hotelId, setHotelId] = useState("")
    
    return(
        <UserContext.Provider value={{cityId, setCityId, ticketId, setTicketId, hotelId, setHotelId}}>
            {children}
        </UserContext.Provider>
    )
}
