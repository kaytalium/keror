import * as $ from 'jquery';
import { AppInterface } from './../interface'
import { footer } from './../footer'
import { searchEngine } from './../widgets/searchEngine'
import { notifier } from './../widgets/notification'
import { profile } from './../widgets/profile'



/**
 * import js-yaml to handle my .yml config files  
 */
const yaml = require('js-yaml');

/**
 * Import node fs
 */
const fs = require('fs');

/**
 * create var for holding the data coming from the footer.yml file
 */
let appTheme: AppInterface.AppTheme;

try {
    appTheme = yaml.load(fs.readFileSync('./app/config/appTheme.yml', 'utf8'))
    // console.log(appTheme)
} catch (e) {
    console.log(e);
}

/**
 * Load the application footer with all the default widgets 
 */
footer.load()

/**
 * Load the search widget 
 */
searchEngine.load()

/**
 * Load the notification widget
 */
notifier.load()

/**
 * Load the Profile 
 */
profile.load()


/**
 * Jquery Document.ready function
 */
$(document).ready(function () {
    $('body').css(Object.assign(appTheme.default.backgroundTheme))
    $('head').append('<link rel="stylesheet" href="' + appTheme.default.info.file + '" type="text/css" />');


    $('.settings').addClass('header-settings')
    $('document').resize(function(){
        console.log($(this).outerWidth())
    })
    console.log($('.kd-content').width())
    
})

