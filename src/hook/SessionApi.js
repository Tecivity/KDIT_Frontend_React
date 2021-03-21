import React,{createContext, useState} from 'react'

export const SessionApi = createContext()
export const SessionProvider = ({ children }) => {
    const [session,setSession] = useState(false)

    return(
        <SessionApi.Provider
            value={{session,setSession}}>
            {children}
        </SessionApi.Provider>
    )
}