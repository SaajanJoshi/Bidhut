import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button,Alert, Image, AsyncStorage, BackHandler, ActivityIndicator,TouchableHighlight,Text,TextInput} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';
import { loading, screen,docRefId} from "../redux/actions/auth";
import {onGmLogout} from "../dbConnection/googleLogin";
import {onfbLogout} from "../dbConnection/facebookLogin";
class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            previousValue:'',
            presentValue:'',
            rate:'',
            calulatedValue:''
        }
    }

     userLogout(e) {
         const {
             navigate
         } = this.props.navigation;
         this.props.onLogout();
         this.props.onLoad(true);
         clearStorage();
         onGmLogout();
         navigate('Login', this.props.onLoad(false));
     }

    calculate(e){
        var prevVal =  parseFloat(this.state.previousValue),
            presVal = parseFloat(this.state.presentValue),
            rate = parseFloat(this.state.rate),
            diff = presVal - prevVal,
            amount = diff * rate;

            this.setState({
                calulatedValue:amount.toString()
            })
    }

    componentDidMount(){
         this.props.onScreen(this.props.navigation.state.routeName);
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
    if ((this.props.isLoad && screenName == 'Calculator') || screenName != 'Calculator') {
      return ( <View style={{ position: "absolute",left: 0,right: 0,top: 0,bottom: 0,alignItems: "center",justifyContent: "center"}}>
                 <ActivityIndicator size = "large"/>
               </View>
            )
    } else if (!this.props.isLoad && screenName == 'Calculator') {
        return (
            <View style={style.mainmenu}>
                <TextInput
                        placeholder = "Present Reading"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({presentValue:text})}
                        keyboardType = 'numeric'
                        value={this.state.presentValue}
                        /> 
                <View style={{ margin: 7 }} />
                <TextInput
                        placeholder = "Previous Reading"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({previousValue:text})}
                        keyboardType = 'numeric'
                        value={this.state.previousValue}
                        /> 
                <View style={{ margin: 7 }} />
                 <TextInput
                        placeholder = "Rate"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({rate:text})}
                        keyboardType = 'numeric'
                        value={this.state.rate}
                        />
                <View style={{ margin: 13 }} />
                    <Text> The amount is : {this.state.calulatedValue}</Text>
                <View style={{ margin: 18 }} />        
                <Button onPress={(e) => this.calculate(e)} title="Calculate"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);