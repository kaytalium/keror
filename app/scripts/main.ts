// Use new ES6 modules syntax for everything.
const remote = require('electron').remote; // native electron module
const jetpack = require('fs-jetpack'); // module loaded from npm
// import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import { status } from './network';
import $ = require('jquery');
const storage = require('electron-json-storage');

import {clock} from './clock'



// console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
var appVer = appDir.read('package.json', 'json').version

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)

$(document).ready(function () {

    storage.get('logged_users', function (err, data) {
        //console.log(data)
        let users = data.users;
        let isLoggin = true;

        users.forEach(el => {
            if (el.status == 'active') {
                isLoggin = false;
            }
        });

        if (isLoggin) {
            //load login component to page
            $('.content').load("./views/authenticate/login.html")
        }else{
            $('.content').load("./views/authenticate/activeUser.html")
        }
    });
    /**
     * here we need to check if any user is logged in if not we display the login screen 
     * if any user is logged in then display there personalized login screen
    */


    //Load the application footer 
    $('.footer').load("./views/general/footer.html", function () {

        //init vars
        let spinner = 'fa-spin'

        //simulate version update for now
        let new_version = '1.0.0';


        if(new_version > appVer){
            $('.setting').children('i').addClass(spinner)
            $('.setting').children('.notice').html('1').css({"display":"flex"})
        }

        //show app version in footer
        $(".version").html('<i class="fa fa-code-fork fa-lg" aria-hidden="true"></i> ' + appVer)

        //Get location for which the current year will be place for the copyright
        $('#copyright_date').html(new Date().getFullYear().toString())

        //get the status of internet connection and display 
        // status($('.online'))

        //load clock with date and time
        clock.time().subscribe((v)=>{
            $('.clock').html(v)
        })
        $('.date').html(clock.today)
    })



})

