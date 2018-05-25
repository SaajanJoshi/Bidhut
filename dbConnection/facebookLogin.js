
import { firebaseApp,facebookToken } from "../services/firebase";
import { FBLoginManager } from "react-native-facebook-login";

export const onfbLogin = (provider) => {
    let token = facebookToken(provider.credentials.token),
        success;
    success = firebaseApp.auth().signInAndRetrieveDataWithCredential(token)
              .then((data)=> {return data;})
              .catch((error) => {return null;});
    return success;
};

export const onfbLogout = () =>{
    FBLoginManager.logout((data) => {
        console.log(data);
    })
}