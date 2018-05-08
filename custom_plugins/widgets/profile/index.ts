import * as $ from 'jquery';
import { PluginInterface } from './../../interface'
import { notification } from 'kplugins'
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
    let appTheme: PluginInterface.AppTheme;

    try {
        let data = fs.readFileSync('./app/editor/configuration/appTheme.yml', 'utf8');
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

            let styleURL = `file://${__dirname}/css/profile.css`
            //Add profile style to the document
            $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');

            let UI = '<div class="p-avatar"></div>'+

            '<div class="p-avatar-detail">'+
                '<div class="arrow-up p-avatar-detail-au"></div>'+
                '<div class="profile-detail-header">'+
                    '<div class="mini-avatar" title="Click to edit profile"></div>'+
                    '<div class="mini-profile-info">'+
                        '<div class="p-username">Ovel Heslop</div>'+
                        '<div class="p-useremail">kayheslop@gmail.com</div>'+
                        '<div class="p-usertype">Administrator</div>'+
                    '</div>'+
                '</div>'+
                    '<div class="mini-info">'+
                        '<ul>'+
                            '<li><i class="fa fa-user" aria-hidden="true"></i><span>My Account</span></li>'+
                            '<li><i class="fa fa-lock" aria-hidden="true"></i><span>Lock Screen</span></li>'+
                            '<li><i class="fa fa-sign-out" aria-hidden="true"></i><span>Sign Out</span></li>'+
                        '</ul>'+
                    '</div>'+
            '</div>';

            let anchor = $('profile')

            anchor.append(UI)

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