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

export const setUsername = (username) =>{
    return {type : 'USERNAME',username:username}
}

export const setPassword = (password) => {
    return {type : 'PASSWORD',password:password}
}

export const setconfirmPassword = (confirmpassword) => {
    return {type : 'CONFIRMPASSWORD',confirmpassword:confirmpassword}
}

export const setStorage = (storage) =>{
    return {type:'STORAGE',storage:storage}
}

export const setPrevReading =(previousReading) =>{
    return {type:'PREV-READING',previousReading:previousReading}
}

export const setPresReading =(presentReading) =>{
    return {type:'PREV-READING',previousReading:presentReading}
}

export const setRate =(rate) =>{
    return {type:'RATE',previousReading:rate}
}

export const setCalculateValue = (calculateValue) => {
    return {tyoe:'CALCULATE',calculateValue:calculateValue}
}