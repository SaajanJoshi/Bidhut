const defaultState = {
    isLoggedIn: false,
    isloggedOut:false,
    username: '',
    password: '',
    isLoad:true,
    screenName:'Login',
    isSignedUp : false
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username: '',
                password: '',
                isloggedOut:true
            });
        case 'SIGNUP':
        return Object.assign({}, state, { 
            isSignedUp: true,
            username: action.username,
            password: action.password
        });
        case 'LOADING':
            return Object.assign({}, state, {
                isLoad: action.load
            });
        case 'SCREEN':
             return Object.assign({}, state, {
                 screenName: action.screen
             });
        break;    
        default:
            return state;
    }
}