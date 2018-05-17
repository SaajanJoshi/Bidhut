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
  AsyncStorage,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { login,signup,loading,screen } from "../redux/actions/auth";
import { firebaseApp } from "../services/firebase";
import { FBLoginManager } from "react-native-facebook-login";
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {GoogleSignin} from 'react-native-google-signin';
import {onGmLogin} from "../Credential/googleLogin";
import {onfbLogin,onfbLoginFound,onfbLoginNotFound,onfbLogout,onfbCancel} from "../Credential/facebookLogin";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: true
    };
  }

  componentDidMount() {
    this.props.onScreen(this.props.navigation.state.routeName);
    const {navigate} = this.props.navigation,
          loading = this.props;
    var success,
        values;
      /*first check Google key if not available then find Facebook key if both not available then Login is displayed*/
    success =  AsyncStorage.getItem('Google').then((data) => {
                          return data;
                      }).then((error) => {
                          return error;
                      })

     Promise.resolve(success).then(function(value){
        if (value != null){
           values = JSON.parse(value);
           success = onGmLogin(values);
           Promise.resolve(success).then(function (value) {
               if (value != null) {
                 loading.onScreen('Dashboard');
                 navigate('Dashboard',{loading:false});
               } else if (value == null) {
                 loading.onLoad(false);
               }
          });
        }
        else if (value == null){
             success = AsyncStorage.getItem('Facebook').then((data) => {
               return data;
             }).then((error) => {
               return error;
             })
             Promise.resolve(success).then(function (value) {
               if (value != null) {
                 values = JSON.parse(value);
                 success = onfbLogin(values);
                 Promise.resolve(success).then(function (value) {
                   if (value != null) {
                     loading.onScreen('Dashboard');
                     navigate('Dashboard', {loading: false});
                   } else if (value == null) {
                     loading.onLoad(false);
                   }
                 });
               } else if (value == null) {
                 loading.onLoad(false);
               }
             });
;        }
     });
  }


getInitialState() {
    return { };
}

 static navigationOptions = {
   header:null,
   
  };

  userLoginNRegistration(e) {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        const { navigate } = this.props.navigation;
          firebaseApp
            .auth()
            .signInWithEmailAndPassword(
              this.state.username,
              this.state.password
            )
            .then(user => {
              this.props.onLogin(this.state.username, this.state.password);
              navigate('Dashboard', {name: this.state.username,loading:false})
            })
            .catch(function(error) {
              Alert.alert(error.message);
            });
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  }

  signup(e){
    const {navigate} = this.props.navigation;
    navigate('SignUp');
  }

  login(e){
      this.userLoginNRegistration(e);
  }

  render() {
    var screenName = this.props.screenName;
    if ((this.props.isLoad && screenName == 'Login') || screenName != 'Login') {
      return ( <View style={{ position: "absolute",left: 0,right: 0,top: 0,bottom: 0,alignItems: "center",justifyContent: "center"}}>
        <ActivityIndicator size = "large"/>
         </View>
      )
    } else if (!this.props.isLoad && screenName == 'Login') {
    return (
      <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "skyblue" }}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
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
          onPress={e => this.login(e)}
          title={Login}
        >
            Login
        </Icon.Button>
        <View style={{ margin: 7 }} />
          <Icon.Button
            color="#000000"
            backgroundColor={"#ffffff"}
            size={20} borderRadius={100}
            onPress={e => this.signup(e)}
            title = "SignUp"
          >
             SignUp
          </Icon.Button>
        <View style={{ margin: 15 }} />
        <FBLoginView/>
        <View style={{ margin: 7 }} />
        <GMLoginView/>
      </ScrollView>
    );
  }  
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad:     state.auth.isLoad,
    screenName: state.auth.screenName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    },
    onLoad: (load) => {
      dispatch(loading(load));
    },
    onScreen:(screenName) => {
      dispatch(screen(screenName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
