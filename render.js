"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Use new ES6 modules syntax for everything.
const electron_1 = require("electron"); // native electron module
const jetpack = require('fs-jetpack'); // module loaded from npm
const $ = require("jquery");
// console.log('Loaded environment variables:', env);
var app = electron_1.remote.app;
var appDir = jetpack.cwd(app.getAppPath());
var appVer = appDir.read('package.json', 'json').version;
// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
$(document).ready(function () {
    //Assign app version to the user
    $(".version").html('v' + appVer);
    //get the form 
    var form = $("#lgon_form");
    var submit = $("#submit");
    //Get location for which the current year will be place for the copyright
    var cr_date = $('#copyright_date');
    var date = new Date().getFullYear();
    cr_date.html(date.toString());
    //handle the login button on the login form
    submit.click(function (e) {
        e.preventDefault();
        //get the form data and setup object with both username and password
        var formData = form.serializeArray();
        var user = {
            username: formData[0].value,
            password: formData[1].value
        };
        //create validate class
        const v = new validate();
        //pass object to checker function that will clean and validate the user input
        var isCleanAndValidated = v.isCleanAndValidated(user);
        if (isCleanAndValidated) {
            //pass values to handler that will check entry against database
        }
        else {
            //display error message to users
            console.log('Invalide data');
        }
    });
});
//class to clean and vaidate and check 
class validate {
    constructor() {
        this.isCleanAndValidated = function (user) {
            var state = true;
            var err = {
                usr: $('#err_usr'),
                pwd: $('#err_pwd')
            };
            //check if empty
            if (user.username.length < 1) {
                state = false;
                err.usr.html("Email cannot be empty").css('color', 'red');
            }
            return state;
        };
    }
}
