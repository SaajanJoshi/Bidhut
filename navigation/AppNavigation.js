import React, {Component} from 'react';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeListeners } from 'react-navigation-redux-helpers';
import {ActivityIndicator,BackHandler} from 'react-native';
import Login from '../pages/Login';
import UserInfo  from '../SignUp/userInfo';
import Dashboard from '../pages/Dashboard';
import SignUp  from '../pages/SignUp';
import SignUpTenant from '../SignUp/SignUpTenant';
import userInfo from '../SignUp/userInfo';
import Calculator from '../pages/Calculator';

import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Login: {screen: Login },
  UserInfo: {screen: UserInfo },
  Dashboard: {screen: Dashboard },
  SignUp:{screen: SignUp},
  userInfo:{screen:userInfo},
  SignUpTenant:{screen:SignUpTenant},
  Calculator:{screen:Calculator},
  });

  const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

  class AppWithNavigationState extends Component {
     constructor(props) {
       super(props);
     }
    
    static PropTypes = ({
      dispatch:PropTypes.func.isRequired,
      nav:PropTypes.object.isRequired,
    })

    componentWillMount(){
       BackHandler.addEventListener('hardwareBackPress', () => {
         const {dispatch,nav} = this.props;
         if (nav.routes.length > 0 && nav.routes[nav.routes.length - 1].routeName === 'Dashboard') {
           return false;
         }
         dispatch({type: 'Navigation/BACK'});
         return true;
       });
    }

    componentDidMount() {
      initializeListeners('root',this.props.nav);
    }

    componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress');
    }


    render(){
      const {dispatch,nav} = this.props;
      return (
      <AppNavigator 
        navigation = {
          addNavigationHelpers({       
          dispatch:dispatch,
          state: nav,
          addListener,
        })}
      />);
    }
  }

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.auth.isSignedUp,
    isLoad: state.auth.isLoad,
    screenName: state.auth.screenName,
    getDocRefId: state.auth.docRefId,
    getUsername: state.auth.username,
    getPassword: state.auth.password,
    getStorage: state.auth.StorageCheck,
    nav: state.nav,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch:dispatch,
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onSignUp: (username, password) => {
      dispatch(signup(username, password));
    },
    onLoad: (load) => {
      dispatch(loading(load));
    },
    onScreen: (screenName) => {
      dispatch(screen(screenName));
    },
    setDocRefId: (DocRefId) => {
      dispatch(docRefId(DocRefId))
    },
    setUsername: (username) => {
        dispatch(setUsername(username))
    },
    setPassword: (password) => {
        dispatch(setPassword(password))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);


