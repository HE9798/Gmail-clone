import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDLKqj6PJILLwoO_1-YylygrgamYD7Fec4",
    authDomain: "clone-1ad03.firebaseapp.com",
    projectId: "clone-1ad03",
    storageBucket: "clone-1ad03.appspot.com",
    messagingSenderId: "114641815556",
    appId: "1:114641815556:web:d1de294b4348f2190a8d51"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider= new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }