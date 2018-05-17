
import { firebaseApp } from "../services/firebase";
import * as firebase from "firebase";

export const onfbLogin = (provider) => {
    let token = firebase.auth.FacebookAuthProvider.credential(provider.credentials.token),
        success;
    success = firebaseApp.auth().signInWithCredential(token)
              .then((data)=> {return data;})
              .catch((error) => {return null;});
    return success;
};

export const onfbLoginFound = (provider) => {
    console.log(provider);
};

export const onfbLoginNotFound = (provider) => {

};
export const onfbLogout = (provider) => {

    
};

export const onfbCancel = (provider) => {

};
export const onfbPermissionsMissing = (provider) => {


};