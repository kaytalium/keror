/**
 * Import electron storage to manager application state and user state and data
 */
const storage = require('electron-json-storage');

/**
 * import the footer constrol module
 */
import { footer } from './editor/module/footer'

/**
 *get the login module views 
 */
import { views } from './editor/module/login'


/**
 * Import jquery module to support ui interaction
 */
import * as $ from 'jquery';

footer.load();

$(document).ready(function () {
    $('body').css({
        margin: 0,
        padding: 0,
        height: '100vh',
        overflow: 'hidden',
        color: "#fff",
        opacity: 0.95,
        background: 'url("./assets/img/bg1.jpg")',
        'background-size': 'cover'
        
    })

    $('.wrapper').css({
        height: '100vh',
        width: '100vw',
        display: 'flex',
        'text-align': 'center',
        'justify-content': 'center',
        'flex-direction': 'column',
    })
})

/**
 * Before any UI is loaded the system must check the state of the app
 * ie. is this the first time the system is starting up? if yes, then run the startup module
 * if not the first time then check if a user is currently logged in, if yes then run active user module
 * if no user is logged in then run login module
 */
storage.get('logged_users', function (err, data) {
    
    //if there is an err then run the login module
    if (err)
        $('.content').append(views.main_login())

    //if data, then get the users list and setup vars
    let users = data.users;
    let isLoggin = true;

    //loop over the users and look for an active user
    users.forEach(el => {
        if (el.status == 'active') {
            isLoggin = false;
        }
    });
    $('.content').append(views.active_user())
    //load the modules base on response from loop
    // if (isLoggin) {
    //     $('.content').load("./views/authenticate/login.html")
    // } else {
    //     $('.content').load("./views/authenticate/activeUser.html")
    // }
});



