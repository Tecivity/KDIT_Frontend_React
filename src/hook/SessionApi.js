import React,{createContext, useState} from 'react'
import firebase from '../firebase'

export const SessionApi = createContext()
export const SessionProvider = ({ children }) => {
    const [user,setUser] = useState('')
    const [session,setSession] = useState(false)
    const [loading, setLoading] = useState(false)
    const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'

    const authListener = () => {
        setLoading(true)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                setUser(user)
                setSession(true)
                setLoading(false)
            } else {
                setUser('')
                setSession(false)
                setLoading(false)
            }
        })
    }

    const handleLogout = () => {
        setLoading(true)
        firebase.auth().signOut()
        setLoading(false)
        setUser('')
        setSession(false)
    }

    return(
        <SessionApi.Provider
            value={{
                session,
                setSession,
                user,
                setUser,
                handleLogout,
                authListener,
                loading,
                setLoading,
                defaultImage
                }}>
            {children}
        </SessionApi.Provider>
    )
}