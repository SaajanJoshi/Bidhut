
import { firebaseApp,facebookToken } from "../services/firebase";

export const onfbLogin = (provider) => {
    let token = facebookToken(provider.credentials.token),
        success;
    success = firebaseApp.auth().signInAndRetrieveDataWithCredential(token)
              .then((data)=> {return data;})
              .catch((error) => {return null;});
    return success;
};
