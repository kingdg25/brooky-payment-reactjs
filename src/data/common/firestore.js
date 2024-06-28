import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA9_3gYrkCX0kXIcXmkgacI7Mb6Yno0CHE",
    authDomain: "brooky-f041f.firebaseapp.com",
    databaseURL: "https://brooky-f041f.firebaseio.com",
    projectId: "brooky-f041f",
    storageBucket: "brooky-f041f.appspot.com",
    messagingSenderId: "184819832732",
    appId: "1:184819832732:web:e4da064c2d7283719ada59",
    measurementId: "G-F4GQW207KC",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export { firebaseApp }
