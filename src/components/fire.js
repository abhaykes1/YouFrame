import firebase from 'firebase/app' ;
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyACW339euzyC3ibcQd5hdNresT7aNTSsTY",
    authDomain: "atlan-task.firebaseapp.com",
    databaseURL: "https://atlan-task.firebaseio.com",
    projectId: "atlan-task",
    storageBucket: "atlan-task.appspot.com",
    messagingSenderId: "429113008814",
    appId: "1:429113008814:web:ddc6cf4f8b282ce582c33f"
  };

var fire = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database()
export {storage, database, fire, firebase as default};