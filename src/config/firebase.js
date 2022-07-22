import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyB964CRQ_Ca5QwgKL42BQhoaA3POkxO_Nc",
    authDomain: "auction-site-sps019.firebaseapp.com",
    projectId: "auction-site-sps019",
    storageBucket: "auction-site-sps019.appspot.com",
    messagingSenderId: "781743336399",
    appId: "1:781743336399:web:a7a127a66d583bc80580ba"


})

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();