import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  NetInfo
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleSignin } from 'react-native-google-signin';
import {onGmLogin} from "../dbConnection/googleLogin";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { loading , docRefId, login} from "../redux/actions/auth";
import {checkUser,addUser} from '../dbConnection/firebaseDb';
import { NavigationActions } from 'react-navigation';

const GMLoginView = (props) =>  (
  <Icon.Button
          onPress={e => loginInGmain(props)}
          backgroundColor={"#ffffff"}
          name={"gmail"}
          size={20}
          borderRadius={100}
          color={"#000000"}>
          Login with Gmail
        </Icon.Button>
)
const loginInGmain = (props) => {
     var status,
         userRefId;
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
         if (isConnected){
             GoogleSignin
               .hasPlayServices({
                 autoResolve: true
               })
               .then(() => {
                 GoogleSignin
                   .configure()
                   .then((success) => {
                     GoogleSignin
                       .signIn()
                       .then((user) => {
                         props.onLoad(true);
                         status = onGmLogin(user);
                         Promise.resolve(status).then(function (value) {
                           if (value != null){
                           AsyncStorage.setItem('Google', JSON.stringify(user));
                           status = checkUser(user.email,'Google'); /**add  user record to the custom db (other than authentication)*/
                             Promise.resolve(status).then(function (values) {
                                 if (values.length > 1) {
                                   if (value != null) {
                                     userRefId =  values[values.length -1].userid;
                                     props.setDocRefId(userRefId);
                                     props.onLogin(props.getUsername, props.getPassword);
                                     props.navigation.dispatch(navigateAction);
                                   } else if (value == null) {
                                     Alert.alert('Check user');
                                     loading.onLoad(false);
                                   }
                                 } else {
                                   status = addUser(user.name, user.email, user.accessToken, user.photo, 'Google');
                                   Promise.resolve(status).then(function (values) { /**returns ref id */
                                       if (values != null){
                                          userRefId = values;
                                          props.setDocRefId(userRefId);
                                          props.onLogin(props.getUsername, props.getPassword);
                                          props.navigation.dispatch(navigateAction);
                                       } else if (values == null) {
                                         Alert.alert('Add user');
                                         loading.onLoad(false);
                                       }
                                   });
                                 }   
                             });
                           } else {
                               Alert.alert('firebase');
                               props.onLoad(false);
                           }
                         });
                       })
                       .catch((error) => {
                         console.log('ERROR', error);
                       });
                   });
               })
               .catch((err) => {
                 console.log("Play services error", err.code, err.message);
               });
             }
       else {
         props.onLoad(false);
         Alert.alert('No Connection Available');
       }
     });
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
    setDocRefId: (DocRefId) =>{
      dispatch(docRefId(DocRefId))
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(GMLoginView));

