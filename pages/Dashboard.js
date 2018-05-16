import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button, Alert, Image, AsyncStorage,BackHandler} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading } from "../redux/actions/auth";

class Dashboard extends Component {

   userLogout(e) {
       const {navigate} = this.props.navigation;
        this.props.onLogout();
        navigate('Login');
    }

    componentDidMount(){
          BackHandler.addEventListener("hardwareBackPress", () => {
                  BackHandler.exitApp();
          });
    }
    meterpage(){
        Alert.alert("Under Construction");
    }

     static navigationOptions = {
        header:null
     };

    render() {
        return (
            <View style={style.mainmenu}>
                <View style={style.mainmenuDashboard} onPress = {this.meterpage}>
                       <Image source={require('../assets/elecmeter.png')} style={style.image} />
                </View>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {username: state.auth.username};
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(logout());
        },
        onLoad:(load) =>{
            dispatch(loading(load));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);