import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";

class GMLoginView extends Component {
  
  LoginNRegistration(provider){
    console.log('google');
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log(token);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  
  render() {
    return( <View>
        <Icon.Button onPress={e => this.LoginNRegistration()} backgroundColor={"#ffffff"} name={"gmail"} size={20} borderRadius={100} color={"#000000"}>
          Login with Gmail
        </Icon.Button>
           </View>);
  }
}
module.exports = GMLoginView;
