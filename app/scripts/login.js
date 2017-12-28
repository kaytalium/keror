"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate");
const $ = require("jquery");
$(document).ready(function () {
    //get the form 
    var form = $("#lgon_form");
    var submit = $("#submit");
    var signupBtn = $("#signupBtn");
    signupBtn.click(function (e) {
        e.preventDefault();
        $('.content').load("./views/authenticate/signup.html");
    });
    //here we check to see if a user is already logged in
    //if yes the present this user screen for them to login
    $('.content').load("./views/authenticate/activeUser.html");
    //if not display default login
    //handle the login button on the login form
    submit.click(function (e) {
        e.preventDefault();
        //get the form data and setup object with both username and password
        var formData = form.serializeArray();
        var user = {
            username: formData[0],
            password: formData[1]
        };
        let profile;
        //create validate class
        const v = new validate_1.default();
        //pass object to checker function that will clean and validate the user input
        var isCleanAndValidated = v.isCleanAndValidated(user);
        if (isCleanAndValidated) {
            //pass values to handler that will check entry against database
            v.login(function (error, data) {
                if (error)
                    throw error;
                //
                if (data.users) {
                    var users = data.users;
                    let currentUser;
                    users.forEach(element => {
                        if (element.username == user.username.value && element.password == user.password.value) {
                            currentUser = element.username;
                        }
                    });
                    //we can now get the current user that is logging in
                    if (currentUser) {
                        data.profile.forEach(el => {
                            if (el[currentUser]) {
                                profile = el[currentUser];
                                profile.username = currentUser;
                            }
                        });
                        v.setProfile(profile);
                        //$(location).attr('href','./dashboard.html');
                    }
                    else {
                        v.validateLogin();
                    }
                }
            });
        }
    });
});