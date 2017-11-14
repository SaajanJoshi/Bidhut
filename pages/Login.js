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
import { login, signUPP, signUP, signup } from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { style } from "../style/elecStyle";
import renderIf from "./renderIf";
import userInfo from "../SignUp/userInfo";
import { facebook, google } from "../services/config.js";
import { FBLogin, FBLoginManager } from "react-native-facebook-login";
import FBLoginView from "../Media/FBLoginView";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "Login",
      username: "",
      password: "",
      status: true
    };
  }

  userLoginNRegistration(e) {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        if (this.state.route == "Login" && isConnected) {
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

  _signinFacebook() {}

  _signinGmail() {
    firebaseApp.auth().g;
  }

  render() {
    /*template for the login with the redirect with the username and password */
    let alt = this.state.route === "Login" ? "SignUp" : "Login";
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
        <Button
          color="#841584"
          onPress={e => this.userLoginNRegistration(e)}
          title={this.state.route}
        />
        <View style={{ margin: 7 }} />
        {renderIf(
          this.state.status,
          <Button
            color="#841584"
            onPress={e => this.toggleRoute(e)}
            title={alt}
          />
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
            console.log(e);
          }}
          onLoginFound={function(e) {
            console.log(e);
          }}
          onLoginNotFound={function(e) {
            console.log(e);
          }}
          onLogout={function(e) {
            console.log(e);
          }}
          onCancel={function(e) {
            console.log(e);
          }}
          onPermissionsMissing={function(e) {
            console.log(e);
          }}
        />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
