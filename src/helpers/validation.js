const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const phoneRegex = /^[0-9]{10,13}$/;
const otpRegex = /^[0-9]{4}$/;
let today = new Date().getFullYear().toString().slice(1, 4);
// const passwordRegex = /^[A-Za-z0-9!@#$%&'*+=?^_`{|}~-]{8,}$/;

const validation = {};

validation.emailFormat = (input) => new Promise((res, rej) => {
    if (emailRegex.test(input) == true) res();
    else rej();
});

validation.emailLength = (input) => new Promise((res, rej) => {
    if (input.length > 0) res();
    else rej();
});

validation.password = (input) => new Promise((res, rej) => {
    if (input.length > 7) res();
    else rej();
});

validation.passwordLength = (input) => new Promise((res, rej) => {
    if (input.length > 0) res();
    else rej();
});

validation.phone = (input) => new Promise((res, rej) => {
    if (phoneRegex.test(input) == true) res();
    else rej();
});

validation.confirmPassword = (password, confirmPassword) => new Promise((res, rej) => {
    if (password == confirmPassword) res();
    else rej();
});

validation.fullName = (input) => new Promise((res, rej) => {
    if (input.length > 0) res();
    else rej();
});

validation.otp = (input) => new Promise((res, rej) => {
    if (otpRegex.test(input) == true) res();
    else rej();
});

validation.updateProfile = (phone, name, email) => new Promise((res, rej) => {
    if (phoneRegex.test(phone) == true) {
        if (!email.includes("privaterelay.appleid.com")) {
            if (name.length > 0) res();
            else rej('name');
        } else {
            rej('email')
        }
    } else {
        rej('phone');
    } 
});

validation.register = (user, socmed) => new Promise((res, rej) => {
    if (user.fullName.length > 0) {
        if (user.email.length > 0) {
            if (emailRegex.test(user.email) == true) {
                if (phoneRegex.test(user.phone) == true) {
                    if (socmed == undefined) {
                        if (user.password.length > 0) {
                            if (user.password.length > 7) {
                                if (user.password == user.confirmPassword) res();
                                else rej('confirmPassword');
                            } else rej('password');
                        } else rej('passwordLength');
                    } else {
                        res();
                    }
                } else rej('phone');
            } else rej('emailFormat');
        } else rej('emailLength');
    } else rej('fullName');
});

validation.appleSignIn = (user) => new Promise((res, rej) => {
    if (user.email.length > 0) {
        if (emailRegex.test(user.email) == true) {
            res();
        } else rej('emailFormat');
    } else rej('emailLength');
});

validation.signInEmail = (phone, password) => new Promise((res, rej) => {
    if (phoneRegex.test(phone) == true) {
        if (password.length > 0) {
            if (password.length > 7) res();
            else rej('password');
        } else rej('passwordLength');
    } else rej('phone');
});

validation.address = (address) => new Promise((res, rej) => {
    if (address.name.length > 0) {
        if (address.receiver_name.length > 0) {
            if (phoneRegex.test(address.phone) == true) {
                if (address.province.name.length > 0) {
                    if (address.city.name.length > 0) {
                        if (address.subdistrict.name.length > 0) {
                            if (address.zip_code.place_name.length > 0) {
                                if (address.zip_code.zip_code.length > 0) {
                                    if (address.address.length > 0) res();
                                    else rej('address');
                                } else rej('zip_code');
                            } else rej('kelurahan');
                        } else rej('subdistrict');
                    } else rej('city');
                } else rej('province');
            } else rej('phone');
        } else rej('receiver_name');
    } else rej('name');
});

validation.resetPassword = (user) => new Promise((res, rej) => {
    if (user.oldPassword.length > 0) {
        if (user.oldPassword.length > 7) {
            if (user.newPassword.length > 0) {
                if (user.newPassword.length > 7) {
                    if (user.newPassword == user.confirmPassword) res();
                    else rej('confirmPassword');
                } else rej('password');
            } else rej('passwordLength');
        } else rej('oldPassword');
    } else rej('oldPasswordLength');
});

validation.forgotPassword = (user) => new Promise((res, rej) => {
    if (user.newPassword.length > 0) {
        if (user.newPassword.length > 7) {
            if (user.newPassword == user.confirmPassword) {
                if (user.otp.length > 0) {
                    if (user.otp.length > 3) res();
                    else rej('otp');
                } else rej('otpLength');
            } else rej('confirmPassword');
        } else rej('password');
    } else rej('passwordLength');
});

validation.creditCard = (user) => new Promise((res, rej) => {
    if (user.creditNumber.length > 0) {
        if (user.creditNumber.length > 15) {
            if (user.expiredMonth.length > 0) {
                if (user.expiredYear.length > 0) {
                    if (user.cvv.length > 2) res();
                    else rej('cvvFormat');
                } else rej('expiredYearLength');
            } else rej('expiredMonthLength');
        } else rej('creditNumber');
    } else rej('creditNumberLength');
});

export default validation;