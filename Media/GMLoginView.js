import React, {Component} from "react";
import {StyleSheet, View, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {onGmLogin} from "../Credential/googleLogin";
import { withNavigation } from 'react-navigation';

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
                status = onGmLogin(user);

                if (status){
                navigate('Dashboard')
                }
                else{
                  Alert.alert('Error has occured');
                }
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
export default withNavigation(GMLoginView);
