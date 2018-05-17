import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button,Alert, Image, AsyncStorage, BackHandler, ActivityIndicator} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading, screen} from "../redux/actions/auth";
import {onGmLogout} from "../Credential/googleLogin";
import {onfbLogout} from "../Credential/facebookLogin";
class Dashboard extends Component {

   userLogout(e) {
       const {navigate} = this.props.navigation;
        this.props.onLogout();
        this.props.onLoad(true);
        clearStorage();
        onGmLogout();
        navigate('Login', this.props.onLoad(false));
    }

    componentDidMount(){
          this.props.onScreen(this.props.navigation.state.routeName);
          BackHandler.addEventListener("hardwareBackPress", () => { /*not feasible currently working but with more screen the functionality is not per witnesss*/
                  BackHandler.exitApp();
          });
          this.props.onLoad(this.props.navigation.state.params.loading);
    }

    componentWillmount(){

    }

    componentWillReceiveProps(){

    }
   
     static navigationOptions = {
        header:null
     };

    render() {
    var screenName = this.props.screenName;
    if ((this.props.isLoad && screenName == 'Dashboard') || screenName != 'Dashboard') {
      return ( <View style={{ position: "absolute",left: 0,right: 0,top: 0,bottom: 0,alignItems: "center",justifyContent: "center"}}>
        <ActivityIndicator size = "large"/>
         </View>
      )
    } else if (!this.props.isLoad && screenName == 'Dashboard') {
        return (
            <View style={style.mainmenu}>
                <View style={style.mainmenuDashboard}>
                       <Image source={require('../assets/elecmeter.png')} style={style.image} />
                </View>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
            </View>
        );
    }
}
}

const mapStateToProps = (state, ownProps) => {
    return {username: state.auth.username,
            isLoad:state.auth.isLoad,
           screenName: state.auth.screenName
         };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(logout());
        },
        onLoad:(load) =>{
            dispatch(loading(load));
        },
        onScreen: (screenName) => {
            dispatch(screen(screenName));
        }
    }
}

 const clearStorage = async () => {
     try {
         await AsyncStorage.clear();
     } catch (error) {
         console.log(error);
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);