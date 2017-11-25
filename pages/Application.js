import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootNavigation from '../navigation/RootNavigation';


class Application extends Component {
    render() {
       return <RootNavigation />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.auth.isLoggedIn,
            isSignedUp: state.auth.isSignedUp}
}

export default connect(mapStateToProps)(Application);
