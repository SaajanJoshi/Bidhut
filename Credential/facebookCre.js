import React, {Component} from 'react';
import { connect } from "react-redux";
import { firebaseApp } from "../services/firebase";

const provider = '';

const state = {
    message: "",
    token: "",
    uid: "",
    type: '',
    credentials: {
        token: '',
        tokenExpirationDate: '',
        userId: ''
    },
    profile: {
        email: '',
        first_name: '',
        id: '',
        last_name: '',
        gender: '',
        name: '',
        picture: {
            data: {
                url: '',
                is_silhouette: ''
            }
        },
        verified: ''
    }
}
export const CredentialValues = () => {
    return state;
}

export const onfbLogin = (provider) => {
    console.log('onfblogin');
    console.log(provider);
    firebaseApp.auth().signInWithCredential(provider.Credentials).then(function(result){
        console.log(result);
       }).catch(function(error){
         console.log(error.message);
       })
};

export const onfbLoginFound = (provider) => {
    console.log('onfbLoginFound');
    console.log(provider);
};

export const onfbLoginNotFound = (provider) => {
    state.message  = provider.message;
    state.provider = provider.provider;
    state.type     = provider.type;
    console.log(provider);
};
export const onfbLogout = (provider) => {
    console.log('onfbLogout');
    console.log(provider);
};

export const onfbCancel = (provider) => {
    console.log('onfbCancel');
    console.log(provider);
};
export const onfbPermissionsMissing = (provider) => {
    console.log('onfbPermissionsMissing');
    console.log(provider);
};