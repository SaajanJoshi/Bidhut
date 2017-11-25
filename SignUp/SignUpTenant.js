import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View, Button, Alert, Image,TextInput } from "react-native";
import style from "../style/elecStyle";

class SignUpTenant extends Component{

    render(){
        return <View style={style.mainmenuSignUpBox3}>
            <Text>{"LandLord ID:"} </Text>
            <TextInput style={style.TextInput} />
            <Button color="#841244" title={"Join"} />
          </View>;}
}

const mapStateToProps = (state, ownProps) => {
  return { username: state.auth.username };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTenant);
