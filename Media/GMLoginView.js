import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class GMLoginView extends Component {
  
  render() {
    return( <View>
        <Icon.Button onPress={console.log('pressed')} backgroundColor={"#ffffff"} name={"gmail"} size={20} borderRadius={100} color={"#000000"}>
          Login with Gmail
        </Icon.Button>
           </View>);
  }
}
module.exports = GMLoginView;
