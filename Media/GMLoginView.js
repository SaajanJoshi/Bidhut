import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  NetInfo
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleSignin } from 'react-native-google-signin';
import {onGmLogin} from "../dbConnection/googleLogin";
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import { loading , docRefId} from "../redux/actions/auth";
import {checkUser,addUser} from '../dbConnection/firebaseDb';

class GMLoginView extends Component {

  loginInGmain() {
    const {navigate} = this.props.navigation,
          loading = this.props;
    var status,userRefId;
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        if (isConnected){
            GoogleSignin
              .hasPlayServices({
                autoResolve: true
              })
              .then(() => {
                GoogleSignin
                  .configure()
                  .then((success) => {
                    GoogleSignin
                      .signIn()
                      .then((user) => {
                        loading.onLoad(true);
                        status = onGmLogin(user);
                        Promise.resolve(status).then(function (value) {
                          if (value != null){
                          AsyncStorage.setItem('Google', JSON.stringify(user));
                          status = checkUser(user.email,'Google'); /**add  user record to the custom db (other than authentication)*/
                            Promise.resolve(status).then(function (values) {
                                if (values.length > 1) {
                                  if (value != null) {
                                    userRefId =  values[values.length -1].userid;
                                    loading.setDocRefId(userRefId);
                                    navigate('Dashboard', {loading: false});
                                  } else if (value == null) {
                                    Alert.alert('Error has occured');
                                    loading.onLoad(false);
                                  }
                                } else {
                                  status = addUser(user.name, user.email, user.accessToken, user.photo, 'Google');
                                  Promise.resolve(status).then(function (values) { /**returns ref id */
                                      if (values != null){
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
                          } else {
                              Alert.alert('Error has occured');
                              loading.onLoad(false);
                          }
                        });
                      })
                      .catch((error) => {
                        console.log('ERROR', error);
                      });
                  });
              })
              .catch((err) => {
                console.log("Play services error", err.code, err.message);
              });
            }
      else {
        loading.onLoad(false);
        Alert.alert('No Connection Available');
      }
    });
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
    isLoad: state.auth.isLoad,
    getDocRefId: state.auth.docRefId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (load) => {
      dispatch(loading(load));
    },
    setDocRefId: (DocRefId) =>{
      dispatch(docRefId(DocRefId))
    }
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(GMLoginView));

