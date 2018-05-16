import { firebaseApp } from "../services/firebase";
import { Alert } from "react-native";
import * as firebase from "firebase";

export const onGmLogin = async(provider) => {
     let token = firebase.auth.GoogleAuthProvider.credential(provider.idToken, provider.accessToken),
         success;

    success = firebaseApp.auth().signInWithCredential(token)
         .then((data) => {
             return true;
         })
         .catch((error) => {
             return false;
         });

     return success;
};
