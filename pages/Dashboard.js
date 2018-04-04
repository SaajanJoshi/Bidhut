import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button, Alert, Image, AsyncStorage} from 'react-native';
import {logout} from '../redux/actions/auth';
import style from '../style/elecStyle';

class Dashboard extends Component {
   userLogout(e) {
        this.props.onLogout();
        AsyncStorage.setItem('login', 'false', () => {});
        // e.preventDefault();
    }

    meterpage(){
        Alert.alert("Under Construction");
    }

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);