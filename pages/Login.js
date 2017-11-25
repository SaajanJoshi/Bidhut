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
import renderIf from "../services/renderIf";
import userInfo from "../SignUp/userInfo";
import { FBLogin, FBLoginManager } from "react-native-facebook-login";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-sign-in';
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel,} from "../Credential/facebookCre";
import RootNavigation from '../navigation/RootNavigation';
import Dashboard from './Dashboard';

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
  static navigationOptions = {
    header: null
  };
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


  toggleRoute = () => {
    const { navigate } = this.props.navigation;
    navigate('UserInfo');
  }

  render() {
    /*template for the login with the redirect with the username and password */
    let alt = this.state.route === "Login" ? "SignUp" : "Login";
    if (this.props.isLoggedIn)
    return <Dashboard/>;
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 40, backgroundColor: "#f5f5f5" }}>

        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 30 }}>{this.state.route.toUpperCase()}</Text>

        <TextInput
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        keyboardType="email-address"
        value={this.state.username}
        onChangeText={text => this.setState({ username: text })}
        style = {{padding: 10}}
        />

        <TextInput
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={text => this.setState({ password: text })}
        style = {{padding: 10}}
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
          onPress={() => this.toggleRoute()}
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
      </View>
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
