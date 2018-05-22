/**for adding the records to the db */
import { firebaseApp } from "../services/firebase";
export const checkUser = (email,provider) => {
         var userRefid,
             data = [],
             firestorm = firestormInit();
 
       return firestorm.collection('users').where('Email', '==', email).where('Provider', '==', provider).get()
           .then(snapshot => {
               snapshot.forEach(doc => {
                   userRefid = doc.id;
                   data.push(doc.data());
               });
               data.push({
                   userid: userRefid
               });
               return data;
           });
};

export const addUser = (name,email,accesstoken,photo,provider) =>{

    var firestorm = firestormInit();
    return firestorm.collection("users").add({
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
};

function firestormInit(){
     var settings = { /* your settings... */
             timestampsInSnapshots: true
         },
         firestorm = firebaseApp.firestore();
         firestorm.settings(settings);
         
     return firestorm;
 }