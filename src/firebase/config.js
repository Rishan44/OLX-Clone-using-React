import {initializeApp}  from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAdwNOYJ1jNpMWy4pQJUkH452PUzxEI8x8",
    authDomain: "olx-clone-19e78.firebaseapp.com",
    projectId: "olx-clone-19e78",
    storageBucket: "olx-clone-19e78.appspot.com",
    messagingSenderId: "950591817433",
    appId: "1:950591817433:web:474c5459e82f8c1c27a0c8",
    measurementId: "G-EZV7DKKESB"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)


export { firebaseApp, auth, firestore};