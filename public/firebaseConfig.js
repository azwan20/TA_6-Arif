// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCedPD-Rck8yVxRassdU5FJQhUv4boTJHo",
    authDomain: "arif-fachmil.firebaseapp.com",
    projectId: "arif-fachmil",
    storageBucket: "arif-fachmil.appspot.com",
    messagingSenderId: "131703154291",
    appId: "1:131703154291:web:bf519b64bc7d6ccfc7ec06",
    measurementId: "G-80RJKNYHNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };