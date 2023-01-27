import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA0UH6XHi_XwBypgJeASfV82s4n23tfdL4',
    authDomain: "whatsapp-clone-8c86c.firebaseapp.com",
    projectId: "whatsapp-clone-8c86c",
    storageBucket: "whatsapp-clone-8c86c.appspot.com",
    messagingSenderId: '16383042449',
    appId: '1:16383042449:web:a6cdea428e4e5fdbd87030'
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}