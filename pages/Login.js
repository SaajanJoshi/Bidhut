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
import { FBLoginManager } from "react-native-facebook-login";
import FBLoginView from "../Media/FBLoginView";
import GMLoginView from "../Media/GMLoginView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({"myKey": value});
    }).done();
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
              AsyncStorage.setItem('login', 'true', () => {});
              this.props.onLogin(this.state.username, this.state.password);
              navigate('Dashboard', {
                name: this.state.username
              })
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
