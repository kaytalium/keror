import * as $ from 'jquery';
import { AppInterface } from './../interface'
import { footer } from './../footer'
import { searchEngine } from './../widgets/searchEngine'
import { notifier } from './../widgets/notification'
import { profile } from './../widgets/profile'
import {cms} from './../views/cms'



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

    //setup the class for the hearder menu settings  
    $('.settings').addClass('header-settings')

    //getting the sidebar links element
    let sidebar_li = $('.sidebar-menu').children('li')

    let title = $('.kd-title').children('h1')
    let titleHolder = $('.kd-title')

    let main_router = $('.main-router')


    // title.css({opacity:0})
    sidebar_li.click('click', function (e) {

        let data = $(this).attr('data-menu')
        title.html(data)
        titleHolder.addClass('load')

        main_router.css({ opacity: 1 })
        if(data=='list')
        main_router.html(cms.load())
        console.log(data)
    })

})

