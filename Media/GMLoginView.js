import React, {Component} from "react";
import {StyleSheet, View, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {onGmLogin} from "../Credential/googleLogin";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { loading } from "../redux/actions/auth";

class GMLoginView extends Component {

  loginInGmain() {
    const {navigate} = this.props.navigation;
    var status;
    GoogleSignin
      .hasPlayServices({autoResolve: true})
      .then(() => {

        GoogleSignin
          .configure()
          .then((success) => {
            GoogleSignin
              .signIn()
              .then((user) => {
                this.props.onLoad(true);
                 status = onGmLogin(user);
                 Promise.resolve(status).then(function (value) {
                   if (value == true) {
                     navigate('Dashboard');
                   } else if (value == false) {
                     Alert.alert('Error has occured');
                   }
                 })
              })
              .catch((error) => {
                console.log('ERROR', error);
              })
          });
      })
      .catch((err) => {
        console.log("Play services error", err.code, err.message);
      })
  }

  render() {
    return (
        <Icon.Button
          onPress={e => this.loginInGmain()}
          backgroundColor={"#ffffff"}
          name={"gmail"}
          size={20}
          borderRadius={100}
          color={"#000000"}>
          Login with Gmail
        </Icon.Button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad: state.auth.isLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (load) => {
      dispatch(loading(load));
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(GMLoginView));

