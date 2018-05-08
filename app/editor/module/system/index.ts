import * as $ from 'jquery';
import { AppInterface } from './../../../common/interface'
import { footer } from './../footer'
import { searchnginx, notification, profile } from 'kplugins'
import { cms } from './../cms'



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
    appTheme = yaml.load(fs.readFileSync('./app/editor/configuration/appTheme.yml', 'utf8'))
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
searchnginx.load()

/**
 * Load the notification widget
 */
notification.load()

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


        main_router.css({ opacity: 1 })
        if (data == 'list') {
            main_router.html('')
            main_router.append(cms.load())
            cms.loadTableData()
        }

        if (data == 'dashboard') {
            main_router.html('')
            titleHolder.addClass('load')
            title.html(data).appendTo(main_router)
        }

        if (data == 'report') {
            main_router.html('')
            title.html(data)
            titleHolder.addClass('load')
        }

    })

})

