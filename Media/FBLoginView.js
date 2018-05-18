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
import { loading } from "../redux/actions/auth";
import { onfbLogin } from "../dbConnection/facebookLogin";
import { user } from '../dbConnection/firebaseDb';

class FBLoginView extends Component {
  signInFB(e){
    const {navigate} = this.props.navigation,
             loading = this.props;
    var status;
    loading.onLoad(true);
      NetInfo.isConnected
        .fetch()
        .then(isConnected => {
            FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
            FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
              if (!error) {
                status = onfbLogin(data);
                console.log('Facebook: ' + JSON.stringify(data));
                Promise.resolve(status).then(function (value) {
                  AsyncStorage.setItem('Facebook', JSON.stringify(data));
                  user(data); /**add  user record to the custom db (other than authentication)*/
                  if (value != null) {
                    navigate('Dashboard', {
                      loading: false
                    });
                  } else if (value == null) {
                    Alert.alert('Error has occured');
                    loading.onLoad(false);
                  }
                })
              } else {
                console.log("Error: ", error);
              }
            })
        }).catch(function(error){
          loading.onLoad(false);
          Alert.alert('Internet Connection not available');
        })  
  }
  render() {
    return(
        <Icon.Button onPress={(e) => this.signInFB(e)} backgroundColor={"#3b5998"} name={"facebook"} size={20} borderRadius={100}>
         Login with facebook
        </Icon.Button>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad:state.auth.isLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (load) => {
      dispatch(loading(load));
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FBLoginView));
