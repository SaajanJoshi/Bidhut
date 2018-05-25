import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  NetInfo,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import { login,signup,loading,screen,docRefId,setUsername,setPassword,setStorage } from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { FBLoginManager } from "react-native-facebook-login";
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {GoogleSignin} from 'react-native-google-signin';
import {onGmLogin} from "../dbConnection/googleLogin";
import style from '../style/elecStyle';
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel} from "../dbConnection/facebookLogin";
import { addUser,checkUser } from '../dbConnection/firebaseDb';
import { NavigationActions } from 'react-navigation';

  const userLoginNRegistration = (props) => {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
          firebaseApp
            .auth()
            .signInWithEmailAndPassword(
              props.getUsername,
              props.getPassword
            )
            .then(user => {
              const navigateAction = NavigationActions.navigate({
                  routeName: 'Dashboard',
                  params: {
                            name: props.getUsername,
                            loading: false
                          },
                });
              props.onLogin(props.getUsername, props.getPassword);
              props.navigation.dispatch(navigateAction);
            })
            .catch(function(error) {
              Alert.alert(error.message);
            });
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  }

const _login = (props) =>{
  userLoginNRegistration(props);
}


const _islogged = async(props) => {
     var success,
         values,
         profile;

      const navigateAction = NavigationActions.navigate({
        routeName: 'Dashboard',
        params: {
          name: props.getUsername,
          loading: false
        },
      });
       /*first check Google key if not available then find Facebook key if both not available then Login is displayed*/ 
      try{
      success =  await AsyncStorage.getItem('Google');
      } catch(error){
        console.log(error);
      }

      Promise.resolve(success).then(function(value){
         if (value != null){
            values = JSON.parse(value);
            success = onGmLogin(values);
            
           Promise.resolve(success).then(function (value) {
             if (value != null){
             success = checkUser(values.email, 'Google'); /**add  user record to the custom db (other than authentication)*/
             Promise.resolve(success).then(function (values) {           
                    userRefId = values[values.length - 1].userid;
                    props.setStorage(true);
                    props.setDocRefId(userRefId);
                    props.onLogin(null,null);
                    props.navigation.dispatch(navigateAction);
              })
              .catch(function (error) {
                Alert.alert('rejected');
                props.setStorage(true);
                props.onLoad(false);
                      
              })
             } else {
               props.setStorage(true);
               props.onLoad(false);
             }
            })
         }
         else if (value == null){   
              success = AsyncStorage.getItem('Facebook').then((data) => {
                return data;
              }).then((error) => {
                return error;
              })
              Promise.resolve(success).then(function (value) {
                if (value != null) {
                  values = JSON.parse(value);
                  profile = JSON.parse(values.profile);
                  success = onfbLogin(values);
                  Promise.resolve(success).then(function (value) {
                    if (value != null){
                    success = checkUser(profile.email, 'Facebook'); /**add  user record to the custom db (other than authentication)*/
                    Promise.resolve(success).then(function (values) {
                          userRefId = values[values.length - 1].userid;
                          props.setStorage(true);
                          props.setDocRefId(userRefId);
                          props.onLogin(null,null);
                          props.navigation.dispatch(navigateAction);
                    })
                    .catch(function (error) {
                      props.setStorage(true);
                      props.onLoad(false);
                      Alert.alert('rejected');
                    })
                   } else {
                     props.setStorage(true);
                     props.onLoad(false);
                   }
                  })
                 } else {
                   props.setStorage(true);
                   props.onLoad(false);
                 }
               })
             } 
           })
         .catch(function(err){
           props.setStorage(true);
           props.onLoad(false);
           Alert.alert(error.message);

         });
}


const _signup = (props) =>{
     const navigateAction = NavigationActions.navigate({
       routeName: 'SignUp',
       params: {
         loading: false
       },
     });
     props.navigation.dispatch(navigateAction);
}

const _calculate = (props) => { 
  const navigateAction = NavigationActions.navigate({
    routeName: 'Calculator',
    params: {
      loading: false
    },
  });
  props.navigation.dispatch(navigateAction);
}


const Login = props => {
  if (!props.getStorage) {
    _islogged(props);
  }

  if (props.isLoad){
    return <View style={{ position: "absolute",left: 0,right: 0,top: 0,bottom: 0,alignItems: "center",justifyContent: "center"}}>
                 <ActivityIndicator size = "large"/>
           </View>
  }
  else if(!props.isLoad){
    return  <ScrollView style={style.mainmenu}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          keyboardType="email-address"
          value={props.getUsername}
          onChangeText={text => props.setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={props.getPassword}
          onChangeText={text => props.setPassword(text)}
        />
        <View style={{ margin: 7 }} />
        <Icon.Button
          color="#000000"
          backgroundColor={"#ffffff"}
          size={20} borderRadius={100}
          onPress={e => _login(props)}
          title='Login'
        >
            Login
        </Icon.Button>
        <View style={{ margin: 7 }} />
          <Icon.Button
            color="#000000"
            backgroundColor={"#ffffff"}
            size={20} borderRadius={100}
            onPress={e => _signup(props)}
            title = "SignUp"
          >
             SignUp
          </Icon.Button>
        <View style={{ margin: 15 }} />
        <FBLoginView/>
        <View style={{ margin: 7 }} />
        <GMLoginView/>
        <TouchableOpacity style={style.floatBtn} onPress={()=> _calculate(props)}>
         <Image source={require('../assets/calc.png')} style={style.imageCircle} />
        </TouchableOpacity>
      </ScrollView>
}}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad    : state.auth.isLoad,
    screenName: state.auth.screenName,
    getDocRefId: state.auth.docRefId,
    getUsername:state.auth.username,
    getPassword:state.auth.password,
    getStorage: state.auth.StorageCheck
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch:dispatch,
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    },
    onLoad: (load) => {
      dispatch(loading(load));
    },
    onScreen:(screenName) => {
      dispatch(screen(screenName));
    },
    setDocRefId: (DocRefId) => {
      dispatch(docRefId(DocRefId))
    },
    setUsername:(username) =>{
      dispatch(setUsername(username))
    },
    setPassword:(password) =>{
      dispatch(setPassword(password))
    },
    setStorage: (storage) =>{
      dispatch(setStorage(storage))
    }
  };
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

Login.navigationOptions = {
  header: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
