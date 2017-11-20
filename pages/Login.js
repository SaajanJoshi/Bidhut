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
  Dimensions
} from "react-native";
import { login,signup } from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { style } from "../style/elecStyle";
import renderIf from "../services/renderIf";
import userInfo from "../SignUp/userInfo";
import { FBLogin, FBLoginManager } from "react-native-facebook-login";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-sign-in';
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel,CredentialValues} from "../Credential/facebookCre";
import UUIDGenerator from "react-native-uuid-generator";
import * as firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "Login",
      username: "",
      password: "",
      status: true,
      uid:''
    };
  }

  userLoginNRegistration(e) {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        if (this.state.route == "Login" && isConnected) {
          console.log('login');
          firebaseApp
            .auth()
            .signInWithEmailAndPassword(
              this.state.username,
              this.state.password
            )
            .then(user => {
              this.props.onLogin(this.state.username, this.state.password);
            })
            .catch(function(error) {
              Alert.alert(error.message);
            });
        } else if (isConnected) {
          firebaseApp
            .auth()
            .createUserWithEmailAndPassword(
              this.state.username,
              this.state.password
            )
            .then(user => {
              Alert.alert("User Registered");
              this.props.onSignUp(this.state.username, this.state.password);
            })
            .catch(function(error) {
              Alert.alert(error.message);
            });
        }
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  }

  toggleRoute(e) {
    let alt = this.state.route === "Login" ? "SignUp" : "Login";

    this.setState({ route: alt });
    if (alt == "SignUp") {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
    e.preventDefault();
  }
  signInWithCredentialFB(e){
    console.log(e);
     firebaseApp.auth().signInWithCredential(e.Credentials).then(function(result){
      console.log(result);
     }).catch(function(error){
       console.log(error.message);
     })
  }

  render() {
    /*template for the login with the redirect with the username and password */
    let alt = this.state.route === "Login" ? "SignUp" : "Login";
    UUIDGenerator.getRandomUUID().then((uuid) => {
      console.log(uuid);
    });

    return (
      <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "skyblue" }}>
        <Text style={{ fontSize: 27 }}>{this.state.route}</Text>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          keyboardType="email-address"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <View style={{ margin: 7 }} />
        <Icon.Button
          color="#000000"
          backgroundColor={"#ffffff"}
          size={20} borderRadius={100}
          onPress={e => this.userLoginNRegistration(e)}
          title={this.state.route}
        >
            {this.state.route}
        </Icon.Button>
        <View style={{ margin: 7 }} />
        {renderIf(
          this.state.status,
          <Icon.Button
            color="#000000"
            backgroundColor={"#ffffff"}
            size={20} borderRadius={100}
            onPress={e => this.toggleRoute(e)}
            title={alt}
          >
             {alt}
          </Icon.Button>

        )}
        <View style={{ margin: 15 }} />
        <FBLogin
          buttonView={<FBLoginView />}
          ref={fbLogin => {
            this.fbLogin = fbLogin;
          }}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          permissions={["email", "user_friends"]}
          onLogin={function(e) {
            onfbLogin(e);
          }}
          onLoginFound={function(e) {
            onfbLoginFound(e);
          }}
          onLoginNotFound={function(e) {
            onfbLoginNotFound(e);
            console.log('Value: ' + JSON.stringify(CredentialValues()));
          }}
          onLogout={function(e) {
            onfbLogout(e);
          }}
          onCancel={function(e) {
            onfbCancel(e);
          }}
          onPermissionsMissing={function(e) {
            onfbPermissionsMissing(e);
          }}
        />
        <View style={{ margin: 7 }} />
        <GMLoginView/>
      </ScrollView>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateLogin: " + state.auth.isLoggedIn);
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
