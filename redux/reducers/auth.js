const defaultState = {
    isLoggedIn: false,
    username: '',
    password: '',
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
        break;
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username: '',
                password: ''
            });
        case 'SIGNUP':
        return Object.assign({}, state, { 
            isSignedUp: true,
            username: action.username,
            password: action.password
        });
        break;    
        default:
            return state;
    }
}