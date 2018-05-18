/**for adding the records to the db */
import { firebaseApp } from "../services/firebase";
export const addUser = (name,email,accesstoken,photo,provider) => {
       const firestore = firebaseApp.firestore(),
            settings = { /* your settings... */
                        timestampsInSnapshots: true
                       };
       firestore.settings(settings);
      return firestore.enablePersistence()
           .then(function () {
               return firestore.collection('users').where('Email', '==', 'abc@gmai.com').get()
                   .then(snapshot => {
                       console.log('inside');
                       snapshot.forEach(doc => {
                           return true;
                       });
                   }).catch(function(err){
                       return false;
                   })
                // return firestore.collection("users").add({
                //         Name: name,
                //         Email: email,
                //         AccessToken: accesstoken,
                //         PhotoUrl: photo,
                //         Provider: provider

                //     })
                //     .then(function (docRef) {
                //         return docRef.id;
                //     })
                //     .catch(function (error) {
                //         return error;
                //     });
           })
           .catch(function (err) {
               console.log(err)
               return err;
           });
};