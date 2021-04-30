import React,{createContext, useState} from 'react'
import firebase from '../firebase'
import { User } from '../firebase/models' 

export const SessionApi = createContext()
export const SessionProvider = ({ children }) => {
    const [user,setUser] = useState('')
    const [userInfo,setUserInfo] = useState('')
    const [session,setSession] = useState(false)
    const [loading, setLoading] = useState(false)
    const defaultImage = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
    const defaultBanner = "https://images7.alphacoders.com/110/thumbbig-1104854.jpg"

    const getUserInfo = (id) => {
        firebase
            .firestore()
            .collection('users')
            .doc(id)
            .get()
            .then(doc => {
                setUserInfo({id:doc.id, ...doc.data()})
            })
    }

    const authListener = () => {
        setLoading(true)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                setUser(user)
                setSession(true)
                setLoading(false)
                getUserInfo(user.uid)
            } else {
                setUser('')
                setUserInfo('')
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
                defaultImage,
                defaultBanner,
                userInfo
                }}>
            {children}
        </SessionApi.Provider>
    )
}