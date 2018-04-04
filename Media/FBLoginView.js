import React, { Component } from "react";
import { StyleSheet, Text, View,Alert } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { login,signup } from "../redux/actions/auth";
import { FBLoginManager } from "react-native-facebook-login";
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel} from "../Credential/facebookCre";

class FBLoginView extends Component {
  signInFB(e){
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
      onfbLogin(data);
      } else {
        console.log("Error: ", error);
      }
    })
    
  }
  render() {
    return(
        <Icon.Button onPress={(e) => this.signInFB(e)} backgroundColor={"#3b5998"} name={"facebook"} size={20} borderRadius={100}>
         Login with facebook
        </Icon.Button>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FBLoginView);
