import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  NetInfo
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FBLoginManager } from "react-native-facebook-login";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { loading, docRefId,login } from "../redux/actions/auth";
import { onfbLogin } from "../dbConnection/facebookLogin";
import { addUser,checkUser } from '../dbConnection/firebaseDb';
import { NavigationActions } from 'react-navigation';

const signInFB = props => {
   var status, profile;
   const navigateAction = NavigationActions.navigate({
     routeName: 'Dashboard',
     params: {
       name: props.getUsername,
       loading: false
     },
   });

  NetInfo.isConnected
    .fetch()
    .then(isConnected => {
      if (isConnected) {
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
        FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
          if (!error) {
            props.onLoad(true);
            status = onfbLogin(data);
            Promise.resolve(status).then(function (value) {
              AsyncStorage.setItem('Facebook', JSON.stringify(data));
              profile = JSON.parse(data.profile);
              status = checkUser(profile.email, 'Facebook'); /**add  user record to the custom db (other than authentication)*/
              Promise.resolve(status).then(function (values) {
                if (values.length > 1) {
                  if (value != null) {
                    userRefId = values[values.length - 1].userid;
                    props.setDocRefId(userRefId);
                    props.onLogin(null, null);
                    props.navigation.dispatch(navigateAction);
                  } else {
                    Alert.alert('Error has occured');
                    loading.onLoad(false);
                  }
                } else {
                  status = addUser(profile.name, profile.email, data.credentials.token, profile.picture.data.url, 'Facebook');
                  Promise.resolve(status).then(function (values) { /**returns ref id */
                    if (values != null) {
                      userRefId = values;
                      props.setDocRefId(userRefId);
                      props.onLogin(null, null);
                      props.navigation.dispatch(navigateAction);
                    } else {
                      Alert.alert('Error has occured');
                      props.onLoad(false);
                    }
                  });
                }
              });
            });
          } else {
            props.onLoad(false);
            console.log("Error: ", error);
          }
        });
      } else {
        loading.onLoad(false);
        Alert.alert('No Connection Available');
      }
    })
}

const FBLoginView = props =>{
  return(
        <Icon.Button onPress={(e) => signInFB(props)} backgroundColor={"#3b5998"} name={"facebook"} size={20} borderRadius={100}>
         Login with facebook
        </Icon.Button>
      );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad: state.auth.isLoad,
    getDocRefId: state.auth.docRefId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onLoad: (load) => {
      dispatch(loading(load));
    },
    setDocRefId: (DocRefId) => {
      dispatch(docRefId(DocRefId))
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FBLoginView));
