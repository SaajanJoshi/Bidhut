
import { firebaseApp } from "../services/firebase";
import * as firebase from "firebase";

export const onfbLogin = (provider) => {
    let token = firebase.auth.FacebookAuthProvider.credential(provider.credentials.token),
        success;
    success = firebaseApp.auth().signInAndRetrieveDataWithCredential(token)
              .then((data)=> {return data;})
              .catch((error) => {return null;});
    return success;
};
