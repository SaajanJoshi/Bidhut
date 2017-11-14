import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <View>
        <Icon.Button onPress={() => {
            if (!this.context.isLoggedIn) {
              this.context.login();
            } else {
              this.context.logout();
            }
          }} backgroundColor={"#3b5998"} name={"facebook"} size={20} borderRadius={100}>
          Login with Facebook
        </Icon.Button>
      </View>;
  }
}
module.exports = FBLoginView;
