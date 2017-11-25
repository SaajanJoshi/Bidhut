const provider = '';

this.state = {
    message: "",
    token: "",
    uid: "",
    type: '',
    credentials:{
        token:'',
        tokenExpirationDate:'',
        userId:'',
    },
    profile:{
        email:'',
        first_name:'',
        id:'',
        last_name:'',
        gender:'',
        name:'',
        picture:{
            data:{
                url:'',
                is_silhouette:'',
            }
        },
        verified:''
    }
}

export const onfbLogin = (provider) => {
    console.log('onfblogin');
    console.log(provider);
};


export const onfbLoginFound = (provider) => {
    console.log('onfbLoginFound');
    console.log(provider);
};

export const onfbLoginNotFound = (provider) => {
    console.log('onfbLoginNotFound');
    console.log(provider);
};
export const onfbLogout = (provider) => {
    console.log('onfbLogout');
    console.log(provider);
};

export const onfbCancel = (provider) => {
    console.log('onfbCancel');
    console.log(provider);
};
export const onfbPermissionsMissing = (provider) => {
    console.log('onfbPermissionsMissing');
    console.log(provider);
};
