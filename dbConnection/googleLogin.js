import { firebaseApp,googleToken } from "../services/firebase";
import { GoogleSignin } from 'react-native-google-signin';
import {Alert} from 'react-native';

export const onGmLogin = (provider) => {
     let token = googleToken(provider.idToken, provider.accessToken),
         success;
    success = firebaseApp.auth().signInAndRetrieveDataWithCredential(token)
         .then((data) => {
             return data;
         })
         .catch((error) => {
             return null;
         });

     return success;
};

export const onGmLogout = () => {
      return GoogleSignin
                .configure()
                .then((success) => {
                    GoogleSignin.currentUserAsync().then((user) => {
                        if (user != null){
                            GoogleSignin.signOut()
                                .then(() => {
                                   /**do somethig here */
                                })
                                .catch((err) => {

                                });
                            state = true;
                        }
                        else{
                            state = true;
                        }
                    });
                });
};
