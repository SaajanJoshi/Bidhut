import * as firebase from 'firebase';
/*connection to the firebase using api and database*/
const firebaseConfig = {
  apiKey: "AIzaSyCXMIvObAHN_j290u-gwFxYuTqO9IQ-nJI",
  authDomain: "elecbill-767e5.firebaseapp.com",
  databaseURL: "https://elecbill-767e5.firebaseio.com"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);