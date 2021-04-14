import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain: "AUTH DOMAIN",
    databaseURL: "DATABASEURL",
    projectId: "ID",
    storageBucket: "STORAGEBUCKET",
    messagingSenderId: "SENDERID",
    appId: "APPID"
}

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // if already initialized, use that one
}

export default app;