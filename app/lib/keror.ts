/**
 * Import electron storage to manager application state and user state and data
 */
const storage = require('electron-json-storage');

/**
 * import the footer constrol module
 */
import { footer } from './footer/footer'


/**
 * Import jquery module to support ui interaction
 */
import * as $ from 'jquery';

footer.load();

/**
 * Before any UI is loaded the system must check the state of the app
 * ie. is this the first time the system is starting up? if yes, then run the startup module
 * if not the first time then check if a user is currently logged in, if yes then run active user module
 * if no user is logged in then run login module
 */
storage.get('logged_users', function (err, data) {

    //if here is an err then run the login module
    if (err)
        $('.content').load("./views/authenticate/login.html")

    //if data, then get the users list and setup vars
    let users = data.users;
    let isLoggin = true;

    //loop over the users and look for an active user
    users.forEach(el => {
        if (el.status == 'active') {
            isLoggin = false;
        }
    });
    $('.content').load("./views/authenticate/login.html")
    //load the modules base on response from loop
    // if (isLoggin) {
    //     $('.content').load("./views/authenticate/login.html")
    // } else {
    //     $('.content').load("./views/authenticate/activeUser.html")
    // }
});



