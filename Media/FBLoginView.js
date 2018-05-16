import React, { Component } from "react";
import { StyleSheet, Text, View,Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FBLoginManager } from "react-native-facebook-login";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel} from "../Credential/facebookLogin";

class FBLoginView extends Component {
  signInFB(e){
    const {navigate} = this.props.navigation;
    var status;
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        status = onfbLogin(data);
         Promise.resolve(status).then(function (value) {
           if (value == true) {
             navigate('Dashboard');
           } else if (value == false) {
             Alert.alert('Error has occured');
           }
         })
        
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
    isSignedUp: state.auth.isSignedUp,
    isLoad:state.auth.isLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (load) => {
      dispatch(loading(load));
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FBLoginView));
