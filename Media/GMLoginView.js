import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firebaseApp } from "../services/firebase";
import * as firebase from "firebase";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { google } from "../services/config"

class GMLoginView extends Component {
  
  loginInGmain(){
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
  })
  .catch((err) => {
    console.log("Play services error", err.code, err.message);
  })

  GoogleSignin.configure({
    webClientId: google.clientID
  })
  .then(() => {
    // you can now call currentUserAsync()
  }).catch((err) => {
    console.log("ERROR", err.code, err.message);
  });

  }

  
  render() {
    return( <View>
        <Icon.Button onPress={e => this.loginInGmain()} backgroundColor={"#ffffff"} name={"gmail"} size={20} borderRadius={100} color={"#000000"}>
          Login with Gmail
        </Icon.Button>
           </View>);
  }
}
module.exports = GMLoginView;
