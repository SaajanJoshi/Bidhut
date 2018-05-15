import React, {Component} from 'react';
import Login from '../pages/Login';
import UserInfo  from '../SignUp/userInfo';
import Dashboard from '../pages/Dashboard';
import SignUp  from '../pages/SignUp';
import SignUpTenant from '../SignUp/SignUpTenant';
import userInfo from '../SignUp/userInfo';
import { StackNavigator } from 'react-navigation';

const RootNavigation = StackNavigator({
  Login: {screen: Login },
  UserInfo: {screen: UserInfo },
  Dashboard: {screen: Dashboard },
  SignUp:{screen: SignUp},
  userInfo:{screen:userInfo},
  SignUpTenant:{screen:SignUpTenant}
},
  {
    navigationOptions: {
      initialRouteName: "Login"
    }
  });
export default RootNavigation;
