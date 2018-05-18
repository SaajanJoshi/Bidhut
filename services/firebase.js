import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
/*connection to the firebase using api and database*/
const firebaseConfig = {
  apiKey: "AIzaSyCXMIvObAHN_j290u-gwFxYuTqO9IQ-nJI",
  authDomain: "elecbill-767e5.firebaseapp.com",
  databaseURL: "https://elecbill-767e5.firebaseio.com",
  projectId: "elecbill-767e5",
  storageBucket: "elecbill-767e5.appspot.com",
  messagingSenderId: "525492615182"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);