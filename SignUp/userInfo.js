import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, View, Button, Alert, Image } from "react-native";
import style from "../style/elecStyle";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import renderIf from "../services/renderIf";
import SignUpTenant from "./SignUpTenant";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "LL",
      status: false
    };
  }

  toggleRoute(value) {
    value === "LL"
      ? this.setState({ status: false })
      : this.setState({ status: true });
  }

  render() {
    return <ScrollView>
        <View>
          <View style={style.mainmenuSignUpBox1}>
            <View>
              <Text style={style.signUptypetext}>{"Select User Type"}</Text>
            </View>
            <View style={{ margin: 7 }} />
            <RadioForm style={style.RadioButton} radio_props={radio_props} initial={0} onPress={value => this.toggleRoute(value)} />
          </View>
          <View style={style.mainmenuSignUpBox2}>
            <View style={style.outerCircleAlign}>
              <View style={style.outercircle}>
                <Image source={require("../assets/prof.png")} style={style.imageCircle} />
              </View>
            </View>
          </View>
          {renderIf(this.state.status, <SignUpTenant />)}
        </View>
      </ScrollView>;
  }
}

const radio_props = [
  {
    label: "LandLord",
    value: "LL"
  },
  {
    label: "Tenant   ",
    value: "TT"
  }
];

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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
