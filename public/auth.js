import { useEffect, useState } from 'react'
import { Authentication } from './firebaseConfig'
import { InitialUserState, useUser } from './user'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import { CircularProgress } from '@mui/material';


async function fetchData_ModelUser() {
    const querySnapshot = await getDocs(collection(db, "model_user"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

const AuthStateChangeProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)

    const user = useUser()
    const { SetUser } = user
    const InitiateAuthStateChange = () => {
        Authentication().onAuthStateChanged(async (user) => {
            if (user) {
                console.log('ini Anda Sudah Login')

                const data = await fetchData_ModelUser();
                const userData = data.find(DbUser => DbUser.email === user.email);

                SetUser({ email: user.email, uid: user.uid, role: userData.role })
            } else {
                console.log('ini Anda Belum Login')
                SetUser(InitialUserState)
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        InitiateAuthStateChange()
    }, [])

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Sesuaikan dengan tinggi yang diinginkan
            }}>
                <CircularProgress />
            </div>
        );
    }

    return children
}

export default AuthStateChangeProvider