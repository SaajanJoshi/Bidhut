import React, {Component} from 'react';
import Login from '../pages/Login';
import UserInfo  from '../SignUp/userInfo';
import Dashboard from '../pages/Dashboard';
import { StackNavigator } from 'react-navigation';


const RootNavigation = StackNavigator({
  Login: { screen: Login },
  UserInfo: { screen: UserInfo },
  Dashboard: { screen: Dashboard },
});
export default RootNavigation;
