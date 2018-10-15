const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const phoneRegex = /^[0-9]{10,12}$/;
// const passwordRegex = /^[A-Za-z0-9!@#$%&'*+=?^_`{|}~-]{8,}$/;

const validation = {};

validation.emailFormat = (input) => new Promise((res,rej) => {
    if(emailRegex.test(input) == true) res();
    else rej();
});

validation.emailLength = (input) => new Promise((res,rej) => {
    if(input.length > 0) res();
    else rej();
});

validation.password = (input) => new Promise ((res,rej) => {
    if(input.length > 7) res();
    else rej();
});

validation.passwordLength = (input) => new Promise ((res,rej) => {
    if(input.length > 0) res();
    else rej();
});

validation.phone = (input) => new Promise ((res,rej) => {
    if(phoneRegex.test(input) == true) res();
    else rej();
});

validation.confirmPassword = (password,confirmPassword) => new Promise ((res,rej) => {
    if(password == confirmPassword) res();
    else rej();
});

validation.fullName = (input) => new Promise((res,rej) => {
    if(input.length > 0) res();
    else rej();
});

validationRegister = (user) => new Promise((res,rej) => {
    if(input.length > 0) {
        if(email.length > 0){
            if(emailRegex.test(user.email) == true){
                if(phoneRegex.test(user.phone) == true){
                    if(user.password.length > 0){
                        if(user.password.length > 7){
                            if(user.password == user.confirmPassword) res();
                            else rej('confirmPassword');
                        } else rej('password');
                    } else rej('passwordLength');
                } else rej('phone');
            } else rej('emailFormat');
        } else rej('emailLength');
    } else rej('fullName');
})

validation.signInEmail = (email,password) => new Promise((res,rej) => {
    if(email.length > 0){
        if(emailRegex.test(email) == true){
            if(password.length > 0){
                if(password.length > 7) res();
                else rej('password');
            } else rej('passwordLength');
        } else rej('emailFormat');
    } else rej('emailLength');
})

export default validation;