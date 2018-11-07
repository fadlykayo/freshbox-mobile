const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const phoneRegex = /^[0-9]{10,13}$/;
const otpRegex = /^[0-9]{4}$/;
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

validation.otp = (input) => new Promise ((res,rej) => {
    if (otpRegex.test(input) == true) res();
    else rej();
})

validation.register = (user) => new Promise((res,rej) => {
    if(user.fullName.length > 0) {
        if(user.email.length > 0){
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

validation.address = (address) =>  new Promise((res,rej) => {
    if(address.name.length > 0) {
        if(address.receiver_name.length > 0) {
            if (phoneRegex.test(address.phone) == true) {
                if(address.province.name.length > 0) {
                    if(address.city.name.length > 0) {
                        if(address.subdistrict.name.length > 0) {
                            if(address.zip_code.place_name.length > 0) {
                                if(address.zip_code.zip_code.length > 0) {
                                    if(address.address.length > 0) res();
                                    else rej('address');
                                } else rej('zip_code');
                            } else rej('kelurahan');
                        } else rej('subdistrict');
                    } else rej('city');
                } else rej('province');
            } else rej('phone');
        } else rej('receiver_name');
    } else rej('name');
})

export default validation;