import React, {Component} from 'react';
import { connect } from "react-redux";
import { firebaseApp } from "../services/firebase";
import * as firebase from "firebase";

const provider = '';

export const onfbLogin = (provider) => {

    let token = firebase.auth.FacebookAuthProvider.credential(provider.credentials.token);
        firebaseApp.auth().signInWithCredential(token)
        .then((data)=>console.log('SUCCESS', data))
        .catch((error)=>console.log('ERROR', error));

};

export const onfbLoginFound = (provider) => {


};

export const onfbLoginNotFound = (provider) => {

};
export const onfbLogout = (provider) => {


};

export const onfbCancel = (provider) => {

};
export const onfbPermissionsMissing = (provider) => {


};
