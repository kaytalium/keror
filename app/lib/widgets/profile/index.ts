import * as $ from 'jquery';
import { AppInterface } from './../../interface'
import { notifier } from './../notification'
import { EventEmitter } from 'events';
import { setTimeout, setInterval } from 'timers';



/**
 * import js-yaml to handle my .yml config files  
 */
const yaml = require('js-yaml');

/**
 * Import node fs
 */
const fs = require('fs');

export module profile {
    /**
     * create var for holding the data coming from the footer.yml file
     */
    let appTheme: AppInterface.AppTheme;

    try {
        let data = fs.readFileSync('./app/config/appTheme.yml', 'utf8');
        appTheme = yaml.load(data)
        // console.log(appTheme)
    } catch (e) {
        console.log(e);
    }

    /**
     * Activate the profile widget 
     * and load widget on page with the <profile> anchor tag
     * 
     */
    export let load = () => {



        $(document).ready(function () {

            let styleURL = `file://${__dirname}/profile.css`
            //Add search style to the document
            $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');



            let PROFILE_ELEMENTS = {
                p_avatar_el: $('.p-avatar'),
                avatar_detail_el: $('.p-avatar-detail'),
                
            }



            PROFILE_ELEMENTS.p_avatar_el.click(function () {
                PROFILE_ELEMENTS.avatar_detail_el.fadeToggle('slow');
            })


            /**
             * esc key and off click for the search result 
             */
            $(document).click(function (e) {
                let profileClasses = ['p-avatar', 'p-avatar-detail', 'p-usertype', 'p-useremail', 'p-username', 'mini-footer']
                let target = e.target.className;
                // console.log(target)
                if (profileClasses.indexOf(target) < 0)
                    PROFILE_ELEMENTS.avatar_detail_el.fadeOut(300)

            })


        })


    }

}