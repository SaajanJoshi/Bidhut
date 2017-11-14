import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import Dashboard from './Dashboard';
import UserInfo  from '../SignUp/userInfo';

class Application extends Component {
    render() {
        if (this.props.isLoggedIn && !this.props.isSignedUp) {
            return <Dashboard/>;
        } else if (!this.props.isLoggedIn && !this.props.isSignedUp){
            return <Login/>;
        }
        else if(this.props.isSignedUp){
            return <UserInfo/>;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.auth.isLoggedIn,
            isSignedUp: state.auth.isSignedUp}
}

export default connect(mapStateToProps)(Application);