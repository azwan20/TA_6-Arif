import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    deleteUser,
} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCedPD-Rck8yVxRassdU5FJQhUv4boTJHo",
    authDomain: "arif-fachmil.firebaseapp.com",
    projectId: "arif-fachmil",
    storageBucket: "arif-fachmil.appspot.com",
    messagingSenderId: "131703154291",
    appId: "1:131703154291:web:bf519b64bc7d6ccfc7ec06",
    measurementId: "G-80RJKNYHNJ"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const db = getFirestore(app);

export { db };

export const FirebaseAuth = getAuth()

export const Authentication = () => {
    return FirebaseAuth
}

export const DeleteUser = async () => {
    const user = FirebaseAuth.currentUser;
    await deleteUser(user);
};



export const SignUp = async (email, password) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
}

export const SignIn = async (email, password) => {
    await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

export const ResetPass = async (email) => {
    await sendPasswordResetEmail(FirebaseAuth, email)
}

export const SignOut = async () => {
    await signOut(FirebaseAuth)
}

export const GetSignInErrorMessage = (code) => {
    switch (code) {
        case 'auth/invalid-email':
            return 'Email tidak terdaftar'
        // case 'auth/wrong-password': 
        default:
            return 'Email atau password salah'
    }
}

export const GetSignUpErrorMessage = (code) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Email telah terdaftar.'
        default:
            return 'Terjadi kesalahan saat proses sign up.'
    }
} 