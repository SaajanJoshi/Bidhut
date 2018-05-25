import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button,Alert, Image, AsyncStorage, BackHandler, ActivityIndicator,TouchableHighlight,Text} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading, screen,docRefId} from "../redux/actions/auth";
import {onGmLogout} from "../dbConnection/googleLogin";
import {onfbLogout} from "../dbConnection/facebookLogin";
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

const userLogout = (props) => {
     const navigateAction = NavigationActions.navigate({
         routeName: 'Login',
         params: {
             loading: false
         },
     });
     props.onLogout();
     props.onLoad(false);
     clearStorage();
     onGmLogout();
     props.navigation.dispatch(navigateAction);
 }

const _calculate = (props) =>{
    const navigateAction = NavigationActions.navigate({
        routeName: 'Calculator',
        params: {
            loading: false
        },
    });
    props.navigation.dispatch(navigateAction);
}

const _onPressButton = props =>{
    Alert.alert(props.getDocRefId);
}

const Dashboard = props =>{
    console.log("Dashboard: " + props.navigation.state.routeName);
           return <View style={style.mainmenu}>
                <View style={style.mainmenuDashboard}>
                    <Image source={require('../assets/elecmeter.png')} style={style.image} />
                    <View style={{ margin: 7 }} />
                    <Button onPress={(e) => _onPressButton(props)} title="Doc Ref"/>
               </View>
                 <View style={{ margin: 7 }} />
                 <TouchableHighlight style={style.childCard}  onPress = {() => _calculate(props)}>
                 <View>
                 <Text> Calculate Unit </Text>
                 </View>
                </TouchableHighlight>   
                 <View style={{ margin: 7 }} />
                 <Button onPress={(e) => userLogout(props)} title="Logout"/>
            </View>
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

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired
};

Dashboard.navigationOptions = {
    header: null,
};

 const clearStorage = async () => {
     try {
         await AsyncStorage.clear();
     } catch (error) {
         console.log(error);
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);