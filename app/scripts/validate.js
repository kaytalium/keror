"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage = require('electron-json-storage');
const $ = require("jquery");
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
                err.usr_e.html('No username or email was provided');
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
        this.validateLogin = () => {
            $('#gen').fadeIn(600).html('invalid username/passowrd');
        };
        this.login = (cb) => {
            storage.get('users', cb);
        };
        this.setProfile = (data) => {
            storage.set('current_user', data, function (err) {
                console.log(err);
            });
        };
        this.isEmail = function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        };
    }
}
exports.default = validate;
