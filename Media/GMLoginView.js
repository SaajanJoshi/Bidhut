import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {firebaseApp} from "../services/firebase";
import * as firebase from "firebase";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {google} from "../services/config"

class GMLoginView extends Component {

  loginInGmain() {
    GoogleSignin
      .hasPlayServices({autoResolve: true})
      .then(() => {

        GoogleSignin
          .configure()
          .then(() => {

            GoogleSignin
              .signIn()
              .then((user) => {

                let token = firebase
                  .auth
                  .GoogleAuthProvider
                  .credential(user.idToken, user.accessToken);
                firebaseApp
                  .auth()
                  .signInWithCredential(token)
                  .then((data) => console.log('SUCCESS', data))
                  .catch((error) => console.log('ERROR', error));
              })
              .catch((error) => {
                console.log('ERROR', error);
              })
          });
      })
      .catch((err) => {
        console.log("Play services error", err.code, err.message);
      })
  }

  render() {
    return (
        <Icon.Button
          onPress={e => this.loginInGmain()}
          backgroundColor={"#ffffff"}
          name={"gmail"}
          size={20}
          borderRadius={100}
          color={"#000000"}>
          Login with Gmail
        </Icon.Button>
    );
  }
}
module.exports = GMLoginView;
