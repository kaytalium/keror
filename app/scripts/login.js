"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
$(document).ready(function () {
    //get the form 
    var form = $("#lgon_form");
    var submit = $("#submit");
    var signupBtn = $("#signupBtn");
    signupBtn.click(function (e) {
        e.preventDefault();
        $('.content').load("./views/authenticate/signup.html");
    });
    //handle the login button on the login form
    submit.click(function (e) {
        e.preventDefault();
        //get the form data and setup object with both username and password
        var formData = form.serializeArray();
        var user = {
            username: formData[0],
            password: formData[1]
        };
        //create validate class
        const v = new validate();
        //pass object to checker function that will clean and validate the user input
        var isCleanAndValidated = v.isCleanAndValidated(user);
        if (isCleanAndValidated) {
            //pass values to handler that will check entry against database
        }
    });
});
//class to clean and vaidate and check 
class validate {
    constructor() {
        this.isCleanAndValidated = function (user) {
            var state = true;
            var err = {
                usr_i: $('#' + user.username.name),
                pwd_i: $('#' + user.password.name),
                usr_e: $('#err_' + user.username.name),
                pwd_e: $('#err_' + user.password.name)
            };
            //check if empty
            if (user.username.value.length < 1) {
                state = false;
                err.usr_i.css('border-bottom', "1px solid red");
                err.usr_e.delay(300).fadeIn(900);
                err.usr_e.html('No user or email was provided');
            }
            else 
            //check if email is valid
            if (user.username.value.length > 1 && !this.isEmail(user.username.value)) {
                state = false;
                err.usr_i.css('border-bottom', "1px solid red");
                err.usr_e.delay(300).fadeIn(900);
                err.usr_e.html('Invalid email please try again');
            }
            else {
                err.usr_i.css('border-bottom', "1px solid #fff");
                err.usr_e.delay(600).fadeOut(900);
            }
            //check if empty
            if (user.password.value.length < 1) {
                state = false;
                err.pwd_i.css('border-bottom', "1px solid red");
                err.pwd_e.delay(300).fadeIn(900);
                err.pwd_e.html('You must provide a password');
            }
            else {
                err.pwd_i.css('border-bottom', "1px solid #fff");
                err.pwd_e.delay(600).fadeOut(900);
            }
            return state;
        };
        this.isEmail = function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        };
    }
}
