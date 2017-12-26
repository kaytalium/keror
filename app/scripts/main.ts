// Use new ES6 modules syntax for everything.
const remote = require('electron').remote; // native electron module
const jetpack = require('fs-jetpack'); // module loaded from npm
// import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import {status} from './network';
import $ = require('jquery'); 

var htmlparser = require("htmlparser");import * as fs from 'fs';
import { parse } from 'path';


// console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
var appVer = appDir.read('package.json', 'json').version

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)

$(document).ready(function(){
    
    //load login component to page
    $('.content').load("./views/authenticate/login.html")

    //Load the application footer 
    $('.footer').load("./views/general/footer.html", function(){
        
        //show app version in footer
        $(".version").html('V'+appVer)

        //Get location for which the current year will be place for the copyright
        $('#copyright_date').html(new Date().getFullYear().toString())

        //get the status of internet connection and display 
        status($('.online'))
    })

    
    
})

