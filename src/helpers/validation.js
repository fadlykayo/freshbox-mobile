const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const phoneRegex = /^[0-9]{10,12}$/;
// const passwordRegex = /^[A-Za-z0-9!@#$%&'*+=?^_`{|}~-]{8,}$/;

const validation = {};

validation.email = (input) => new Promise((res,rej) => {
    if(emailRegex.test(input) == true) res();
    else rej();
});

validation.phone = (input) => new Promise ((res,rej) => {
    if(phoneRegex.test(input) == true) res();
    else rej();
})

validation.password = (input) => new Promise ((res,rej) => {
    if(input.length > 8) res();
    else rej();
})

validation.confirmPassword = (password, confirmPassword) => new Promise ((res,rej) => {
    if(password == confirmPassword) res();
    else rej();
})

export default validation;