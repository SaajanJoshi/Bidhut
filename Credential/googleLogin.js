import { firebaseApp } from "../services/firebase";
import { Alert } from "react-native";
import * as firebase from "firebase";

export const onGmLogin = (provider) => {
     let token = firebase.auth.GoogleAuthProvider.credential(provider.idToken, provider.accessToken),
         success;
         
     firebaseApp.auth().signInWithCredential(token)
         .then((data) =>{success = true;})
         .catch((error) => {success = false;});

     return success;
};
