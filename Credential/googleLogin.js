import { firebaseApp } from "../services/firebase";
import * as firebase from "firebase";

export const onGmLogin = (provider) => {
     let token = firebase.auth.GoogleAuthProvider.credential(provider.idToken, provider.accessToken),
         success;
    success = firebaseApp.auth().signInWithCredential(token)
         .then((data) => {
             return data;
         })
         .catch((error) => {
             return null;
         });

     return success;
};
