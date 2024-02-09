import { useEffect, useState } from 'react'
import { Authentication } from './firebaseConfig' 
import { InitialUserState, useUser } from './user'

const AuthStateChangeProvider = ({ children }) => {
    const user = useUser()
    const { SetUser } = user
    const InitiateAuthStateChange = () => {
        Authentication().onAuthStateChanged((user) => {
            if (user) {
                console.log('Anda Sudah Login')
                // console.log(user) 
                SetUser({ email: user.email, uid: user.uid })
            } else {
                console.log('Anda Belum Login')
                SetUser(InitialUserState)
            }
        })
    }

    useEffect(() => {
        InitiateAuthStateChange()
    }, [])

    return children
}

export default AuthStateChangeProvider 