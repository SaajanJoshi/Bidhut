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
import { loading, docRefId } from "../redux/actions/auth";
import { onfbLogin } from "../dbConnection/facebookLogin";
import { addUser,checkUser } from '../dbConnection/firebaseDb';

class FBLoginView extends Component {
  signInFB(e){
    const {navigate} = this.props.navigation,
             loading = this.props;
    var status,profile;
    loading.onLoad(true);
      NetInfo.isConnected
        .fetch()
        .then(isConnected => {
            FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
            FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
              if (!error) {
                status = onfbLogin(data);
                Promise.resolve(status).then(function (value) {

                  AsyncStorage.setItem('Facebook', JSON.stringify(data));
                  profile = JSON.parse(data.profile);
                  status = checkUser(profile.email, 'Facebook'); /**add  user record to the custom db (other than authentication)*/
                   Promise.resolve(status).then(function (values) {
                     if (values.length > 1) {
                       if (value != null) {
                         userRefId = values[values.length - 1].userid;
                         loading.setDocRefId(userRefId);
                         navigate('Dashboard', {
                           loading: false
                         });
                       } else if (value == null) {
                         Alert.alert('Error has occured');
                         loading.onLoad(false);
                       }
                     } else {
                       status = addUser(profile.name, profile.email, data.credentials.token, profile.picture.data.url, 'Facebook');
                       Promise.resolve(status).then(function (values) { /**returns ref id */
                         if (values != null) {
                           userRefId = values;
                           loading.setDocRefId(userRefId);
                           navigate('Dashboard', {
                             loading: false
                           });
                         } else if (values == null) {
                           Alert.alert('Error has occured');
                           loading.onLoad(false);
                         }
                       });
                     }
                   });
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
    isLoad: state.auth.isLoad,
    getDocRefId: state.auth.docRefId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (load) => {
      dispatch(loading(load));
    },
    setDocRefId: (DocRefId) => {
      dispatch(docRefId(DocRefId))
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FBLoginView));
