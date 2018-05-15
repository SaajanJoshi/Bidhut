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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword:""
    };
  }

  componentDidMount() {

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
          const {navigate} = this.props.navigation;
          firebaseApp
            .auth()
            .createUserWithEmailAndPassword(
              this.state.username,
              this.state.password
            )
            .then(user => {
              Alert.alert("User Registered");
              this.props.onSignUp(this.state.username, this.state.password);
              navigate('userInfo');
            })
            .catch(function(error) {
              Alert.alert(error.message);
            });
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  }

  signup(e) { 
    if (this.state.password == this.state.confirmpassword){
        this.userLoginNRegistration(e);
    }
    else{
        Alert.alert("Password Missmatched");
    }
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
          <TextInput
          placeholder="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.confirmpassword}
          onChangeText={text => this.setState({ confirmpassword: text })}
        />

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
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
