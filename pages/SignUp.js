import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  AlertAndroid,
  NetInfo,
  Dimensions,
  AsyncStorage
} from "react-native";
import { login,signup,setUsername,setPassword,setconfirmPassword} from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { style } from "../style/elecStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const userLoginNRegistration = (props) => {
  NetInfo.isConnected
    .fetch()
    .then(isConnected => {
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(
          props.getUsername,
          props.getPassword
        )
        .then(user => {
          Alert.alert("User Registered");
          props.onSignUp(props.username, props.password);
        })
        .catch(function (error) {
          Alert.alert(error.message);
        });
    })
    .catch(function (error) {
      Alert.alert(error.message);
    });
}

const _signup = (props) => {
  if (props.password == props.confirmpassword) {
    this.userLoginNRegistration(e);
  } else {
    Alert.alert("Password Missmatched");
  }
}

const SignUp = props => {
  return (
      <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "skyblue" }}>
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
          <TextInput
          placeholder="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={props.getConfirmPassword}
          onChangeText={text => props.setconfirmPassword(text)}
        />

        <View style={{ margin: 7 }} />
          <Icon.Button
            color="#000000"
            backgroundColor={"#ffffff"}
            size={20} borderRadius={100}
            onPress={() => _signup(props)}
            title = "SignUp"
          >
             SignUp
          </Icon.Button>
      </ScrollView>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    getUsername:state.auth.username,
    getPassword:state.auth.password,
    getConfirmPassword:state.auth.confirmpassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    },
    setUsername: (username) => {
        dispatch(setUsername(username))
    },
    setPassword: (password) => {
        dispatch(setPassword(password))
    },
    setConfirmPassword: (confirmPassword) =>{
      dispatch(setconfirmPassword(password))
    }
  };
};

SignUp.navigationOptions = {
  header: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
