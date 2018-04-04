
import { firebaseApp } from "../services/firebase";
import { Alert,AsyncStorage } from "react-native";
import * as firebase from "firebase";

export const onfbLogin = (provider) => {
    let token = firebase.auth.FacebookAuthProvider.credential(provider.credentials.token);
        firebaseApp.auth().signInWithCredential(token)
        .then((data)=> {
            Alert.alert("User Created In firebase with facebook Credential");
            AsyncStorage.setItem('login', 'true', () => {});
        })
        .catch((error)=>{return error});
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