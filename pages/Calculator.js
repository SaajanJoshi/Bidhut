import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button,Alert, Image, AsyncStorage, BackHandler, ActivityIndicator,TouchableHighlight,Text,TextInput} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading, screen,docRefId,setPresReading,setPrevReading,setRate} from "../redux/actions/auth";
import {onGmLogout} from "../dbConnection/googleLogin";
import renderIf from "../services/renderIf";
import {onfbLogout} from "../dbConnection/facebookLogin";

const userLogout = props => {
    const navigateAction = NavigationActions.navigate({
        routeName: 'Login',
        params: {
            loading: false
        },
    });
    props.onLogout();
    props.onLoad(true);
    clearStorage();
    onGmLogout();
    props.navigation.dispatch(navigateAction);
 }

const calculate = (props) => {
    var prevVal = parseFloat(props.getPreviousReading),
        presVal = parseFloat(props.getPresentReading),
        rate = parseFloat(props.getRate),
        diff = presVal - prevVal,
        amount = diff * rate;
    props.setCalculateValue(amount.toString());
}

const Calculator = props =>{
        return (
            <View style={style.mainmenu}>
                <TextInput
                        placeholder = "Present Reading"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => {props.setPresReading(text)}}
                        keyboardType = 'numeric'
                        value={props.getPresentReading}
                        /> 
                <View style={{ margin: 7 }} />
                <TextInput
                        placeholder = "Previous Reading"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => {props.setPrevReading(text)}}
                        keyboardType = 'numeric'
                        value={props.getPreviousReading}
                        /> 
                <View style={{ margin: 7 }} />
                 <TextInput
                        placeholder = "Rate"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) =>{props.setRate(text)}}
                        keyboardType = 'numeric'
                        value={props.getRate}
                        />
                <View style={{ margin: 13 }} />
                    <Text> The amount is : {props.getCalculateValue}</Text>
                <View style={{ margin: 18 }} />        
                <Button onPress={(e) => calculate(props)} title="Calculate"/>
                <View style={{ margin: 7 }} />
                {renderIf(props.isLoggedIn, <Button onPress={() => userLogout(props)} title="Logout"/>)}
            </View>
        );
}

const mapStateToProps = (state, ownProps) => {
    return {username: state.auth.username,
            isLoad:state.auth.isLoad,
            screenName: state.auth.screenName,
            getDocRefId: state.auth.docRefId,
            isLoggedIn: state.auth.isLoggedIn,
            getPreviousReading:state.auth.previousReading,
            getPresentReading:state.auth.presentReading,
            getRate:state.auth.rate,
            getCalculateValue:state.auth.calculateValue
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
        },
        setPrevReading:(previousReading) =>{
            dispatch(setPrevReading(previousReading));
        },
        setPresReading:(presentReading) =>{
            dispatch(setPresReading(presentReading));
        },
        setRate:(rate) =>{
             dispatch(setRate(rate));
        },
        setCalculateValue:(calculateValue) =>{
             dispatch(setCalculateValue(calculateValue));
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

 Calculator.navigationOptions = {
     header: null,
 };

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);