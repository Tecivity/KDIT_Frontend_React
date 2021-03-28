import React,{createContext, useState} from 'react'
import firebase from '../firebase'

export const SessionApi = createContext()
export const SessionProvider = ({ children }) => {
    const [user,setUser] = useState('')
    const [session,setSession] = useState(false)

    const handleLogout = () => {
        firebase.auth().signOut()
        setUser('')
        setSession(false)
    }

    return(
        <SessionApi.Provider
            value={{session,setSession,user,setUser,handleLogout}}>
            {children}
        </SessionApi.Provider>
    )
}