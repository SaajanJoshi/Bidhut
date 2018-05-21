/**for adding the records to the db */
import { firebaseApp } from "../services/firebase";
export const checkUser = (email,provider) => {
       var firestore = firebaseApp.firestore(),
             settings = { /* your settings... */
                        timestampsInSnapshots: true
                       },
            userRefid,
            data = [];
       firestore.settings(settings);
       return firestore.collection('users').where('Email', '==', email).where('Provider', '==', provider).get()
           .then(snapshot => {
               snapshot.forEach(doc => {
                   userRefid = doc.id;
                   data.push(doc.data());
               });
               data.push({
                   userid: userRefid
               });
               return data;
           }).catch(function (err) {
               return err;
           })
};

export const addUser = (name,email,accesstoken,photo,provider) =>{
     var firestore = firebaseApp.firestore(),
         settings = { /* your settings... */
             timestampsInSnapshots: true
         };
         firestore.settings(settings);

    return firestore.collection("users").add({
            Name: name,
            Email: email,
            AccessToken: accesstoken,
            PhotoUrl: photo,
            Provider: provider

        })
        .then(function (docRef) {
            return docRef.id;
        })
        .catch(function (error) {
            return null;
        });
}