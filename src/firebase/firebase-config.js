import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// Your web app's Firebase configuration
//const firebaseConfig = {
    //apiKey: "AIzaSyDyU-sbLqae_qF6m9Tdsd1tZp55-luaLCY",
    //authDomain: "react-app-cursos-64725.firebaseapp.com",
    //projectId: "react-app-cursos-64725",
    //storageBucket: "react-app-cursos-64725.appspot.com",
    //messagingSenderId: "677064020504",
    //appId: "1:677064020504:web:00f29026e84103c365e96d"
//};

//const firebaseConfigTesting = {
  //apiKey: "AIzaSyCg-YJ30jt885q3cZAJjUPwqJC4CbGSU2c",
  //authDomain: "journal-testing-acd2b.firebaseapp.com",
  //projectId: "journal-testing-acd2b",
  //storageBucket: "journal-testing-acd2b.appspot.com",
  //messagingSenderId: "743584423216",
  //appId: "1:743584423216:web:0a03798e85bf7fff7bfcf5"
//};

//console.log( process.env );

firebase.initializeApp(firebaseConfig);

//if(  process.env.NODE_ENV === 'test')
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfigTesting);
//else
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}