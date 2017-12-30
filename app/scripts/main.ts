/**
 * import interface
 */
import {FooterSettings} from './interface'

/**
 * import network status to display play the state of the internet to the app
 */
import { status } from './network';

/**
 * Import jquery module to support ui interaction
 */
import * as $ from 'jquery';

/**
 * import js-yaml to handle my .yml config files  
 */
const yaml = require('js-yaml');

/**
 * Import node fs
 */
const fs = require('fs');

/**
 * Import electron storage to manager application state and user state and data
 */
const storage = require('electron-json-storage');

/**
 * Import application clock to display time on ui and set timmer for ui elements
 */
import { clock } from './clock'


/**
 * create var for holding the data coming from the footer.yml file
 */
let footerSettings: FooterSettings;

try {
    footerSettings = yaml.safeLoad(fs.readFileSync('./app/config/footer.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

/**
 * Get the current app version to display in ui
 */
var APPVERSION = footerSettings.version.number

/**
 * check if document is ready and setup the views base on app & user data
 */
$(document).ready(function () {


    /**
    * Load the application footer and setup the various widgets
    */
    $('.footer').load("./views/general/footer.html", function () {

        let footer = $('footer')

        //simulate version update for now
        let new_version = '1.0.0';

        //get the setting icon and display on screen
        footer.append(footerSettings.settings.parent)
        $('.setting').append(footerSettings.settings.icon)

        if (new_version > APPVERSION) {
            $('.setting').append(footerSettings.settings.notice_el)
        }

        //show app version in footer
        footer.append(footerSettings.version.parent)
        $(".version").html(footerSettings.version.icon + APPVERSION)

        //Get location for which the current year will be place for the copyright
        footer.append(footerSettings.copyright.parent)
        $('.copyright').html(footerSettings.copyright.info)

        

        //get the status of internet connection and display 
        footer.append(footerSettings.online.parent)
        $('.online').html(footerSettings.online.icon)

        //load running clock
        footer.append(footerSettings.time.clock)
        clock.time().subscribe((v) => {
            $('.clock').html(v)
        })

        //load the current day month and date
        footer.append(footerSettings.time.date)
        $('.date').html(clock.today)
    })


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

})

