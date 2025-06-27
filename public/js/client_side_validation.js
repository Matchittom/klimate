// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!




//select forms
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');


//------------------------------------------------------------------------------------


//show errors
const showError = (hold, text) => {
    const ee = document.createElement('div');
    ee.className = 'error-message';
    ee.textContent = text;
    hold.parentNode.appendChild(ee);
};




//get rid of errors message
const noError = (hold) => {
    const em = hold.parentNode.querySelectorAll('.error-message');
    em.forEach(text => text.remove());
};


//------------------------------------------------------------------------------------


//make sure registration is valid
const goodReg = () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const emailAddress = document.getElementById('emailAddress');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const role = document.getElementById('role');


    //get rid of error messages
    [firstName, lastName, emailAddress, password, confirmPassword, role].forEach(hold => {
        noError(hold);
    });


//ensure no fields are left empty
if (!firstName.value.trim() || !lastName.value.trim() || !emailAddress.value.trim() || !password.value || !confirmPassword.value || !role.value) {
    showError(firstName, 'First name required!');
    showError(lastName, 'Last name required!');
    showError(emailAddress, 'Email required!');
    showError(password, 'Password required!');
    showError(confirmPassword, 'Confirm Password required!');
    showError(role, 'Role required!');
    return false;
}


//passwords and confirm password must match
if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match!');
    return false;
}
//otherwise
return true;
};


//------------------------------------------------------------------------------------


//make sure login is valid
const goodLogin = () => {
    const emailAddress = document.getElementById('loginEmailAddress');
    const password = document.getElementById('loginPassword');


    //get rid of error messages
    [emailAddress, password].forEach(hold => {
        noError(hold);
    });


//ensure no fields are left empty
if (!emailAddress.value.trim() || !password.value) {
    showError(emailAddress, 'Email address required');
    showError(password, 'Password required');
    return false;
}


return true;
}


//------------------------------------------------------------------------------------


//event listener for registration form
if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();


        //validate
        if (goodReg()) {
            registerForm.submit();
        }
    });
}


//event listener for login form
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();


        //validate
        if (goodLogin()) {
            loginForm.submit();
        }
    });
}
