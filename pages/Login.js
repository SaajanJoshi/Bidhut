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
import { login,signup } from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { style } from "../style/elecStyle";
import renderIf from "../services/renderIf";
import userInfo from "../SignUp/userInfo";
import { FBLoginManager } from "react-native-facebook-login";
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import UUIDGenerator from "react-native-uuid-generator";

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

  componentDidMount() {
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({"myKey": value});
    }).done();
}


getInitialState() {
    return { };
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
              AsyncStorage.setItem('login', 'true', () => {});
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

  render() {
    /*template for the login with the redirect with the username and password */
    let alt = this.state.route === "Login" ? "SignUp" : "Login";
    // UUIDGenerator.getRandomUUID().then((uuid) => {
    //   console.log(uuid);
    // });
    
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
        <FBLoginView/>
        <View style={{ margin: 7 }} />
        <GMLoginView/>
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
