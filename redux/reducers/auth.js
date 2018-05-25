
const defaultState = {
    isLoggedIn: false,
    isloggedOut:false,
    username: '',
    password: '',
    confirmpassword:'',
    isLoad:true,
    docRefId:'',
    screenName:'Login',
    isSignedUp : false,
    StorageCheck:false,
    /**calculation */
    previousReading: '',
    presentReading: '',
    rate: '',
    calculateValue:''
};
 
export default function reducer(state = defaultState, action){
    console.log(action);
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
        case 'USERNAME':
            return Object.assign({}, state, {
                username: action.username
            });
        case 'PASSWORD':
            return Object.assign({}, state, {
                password: action.password
            });
         case 'CONFIRMPASSWORD':
             return Object.assign({}, state, {
                confirmpassword: action.confirmpassword
             });
        case 'DOCREFID':
             return Object.assign({}, state, {
                 docRefId: action.docRefId
             });
        case 'STORAGE':
             return Object.assign({}, state, {
                 StorageCheck: action.storage
             });
        case 'PREV-READING':
            return Object.assign({}, state, {
                StorageCheck: action.previousReading
            });
        case 'PRES-READING':
            return Object.assign({}, state, {
                StorageCheck: action.presentReading
            });
        case 'RATE':
            return Object.assign({}, state, {
                StorageCheck: action.rate
            });
        case 'CALCULATE':
            return Object.assign({}, state, {
                calculateValue: action.calculateValue
            });
        break;    
        default:
            return state;
    }
}