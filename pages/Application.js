import React, {Component} from 'react';
import {connect} from 'react-redux';
import RootNavigation from '../navigation/RootNavigation';
import Dashboard from '../pages/Dashboard';

  class Application extends Component {
      render() {
          return <RootNavigation/> ;
      }
  }

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.auth.isLoggedIn,
            isSignedUp: state.auth.isSignedUp,
            isloggedOut: state.auth.isloggedOut}
}

export default connect(mapStateToProps)(Application);