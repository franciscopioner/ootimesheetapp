import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAFGxphPvfvUuTSn6z0nMKWPdn8cpBHceY",
    authDomain: "hours-778a5.firebaseapp.com",
    databaseURL: "https://hours-778a5-default-rtdb.firebaseio.com",
    projectId: "hours-778a5",
    storageBucket: "hours-778a5.appspot.com",
    messagingSenderId: "389655280406",
    appId: "1:389655280406:web:537f7d233a9ad7fdbb6e37"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();

export {firebase, auth, firestore};