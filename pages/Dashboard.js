import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button,Alert, Image, AsyncStorage, BackHandler, ActivityIndicator,TouchableHighlight} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading, screen,docRefId} from "../redux/actions/auth";
import {onGmLogout} from "../dbConnection/googleLogin";
import {onfbLogout} from "../dbConnection/facebookLogin";
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
          BackHandler.addEventListener("hardwareBackPress", () => { /*not feasible currently working but with more screen the functionality is not per witness*/
                  BackHandler.exitApp();
          });
          this.props.onLoad(this.props.navigation.state.params.loading);
    }

    componentWillmount(){

    }

    componentWillReceiveProps(){

    }
   _onPressButton(){
       Alert-alert('User Ref Id: ' + this.props.getDocRefId);
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
                <Button onPress={(e) => this._onPressButton()} title="Doc Ref"/>
                 <View style={{ margin: 7 }} />
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
            </View>
        );
    }
}
}

const mapStateToProps = (state, ownProps) => {
    return {username: state.auth.username,
            isLoad:state.auth.isLoad,
            screenName: state.auth.screenName,
            getDocRefId: state.auth.docRefId
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