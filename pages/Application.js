import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppWithNavigationState from '../navigation/AppNavigation';

class Application extends Component {
      render() {
          return <AppWithNavigationState/> ;
      }
}

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.auth.isLoggedIn,
            isSignedUp: state.auth.isSignedUp,
            isloggedOut: state.auth.isloggedOut}
}

export default connect(mapStateToProps)(Application);