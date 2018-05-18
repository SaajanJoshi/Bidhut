export const login = (username, password) => {
    return {type: 'LOGIN', username: username, password: password};
};

export const logout = () => {
    return {type: 'LOGOUT'};
};

export const signup = (username, password) => {
    return {type: 'SIGNUP', username: username, password: password};
};

export const loading = (load) => {
    return {type:'LOADING',load:load};
}

export const screen = (screenName) => {
    return {type:'SCREEN',screen:screenName};
}

export const docRefId = (refId) =>{
    return {type : 'DOCREFID',docRefId:refId};
}