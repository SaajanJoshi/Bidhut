import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import { View, Text, AsyncStorage} from 'react-native';
import Dashboard from './Dashboard';
import UserInfo  from '../SignUp/userInfo';
import Spinner from 'react-native-loading-spinner-overlay';

class Application extends Component {

   state = {
            status: 'false',
            isLoading:true,
            visible:false
        };    
     componentDidMount () { 
         this.getData();
         setInterval(() => {
            this.setState({
              visible: !this.state.visible
            });
        }, 3000);
      } 

      async getData(){
        await AsyncStorage.getItem('login', (err, result) => {
            if(!err){
            this.setState({status:result});
            }
            this.setState({isLoading:false});
        });
      }

    render() {
        let status = this.state.status;
        console.log("status: " + this.state.status + "login state: " + this.props.isLoggedIn);
        if (this.state.isLoading)
        {
          return <View style={{ flex: 1 }}><Spinner visible={this.state.visible}>
                 <Text>Loading...</Text>
                </Spinner></View>;  
        }else{
        if ((this.props.isLoggedIn && !this.props.isSignedUp) || (status == 'true' && this.props.isloggedOut)) {
            return <Dashboard/>;
        } else if (!this.props.isLoggedIn && !this.props.isSignedUp && status  == 'false' && !this.props.isloggedOut ){
            return <Login/>;
        }
        else if(this.props.isSignedUp){
            return <UserInfo/>;
        }
    }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {isLoggedIn: state.auth.isLoggedIn,
            isSignedUp: state.auth.isSignedUp,
            isloggedOut: state.auth.isloggedOut}
}

export default connect(mapStateToProps)(Application);