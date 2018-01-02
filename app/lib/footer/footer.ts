/**
 * import interface
 */
import { FooterSettings } from './../interface'

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
 * Import application clock to display time on ui and set timmer for ui elements
 */
import { clock } from './clock'

export module footer {
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

    export let load = () => {

        /**
         * When the document is ready, load the footer in the calling document 
         */

        $(document).ready(function () {

            let style = {
                height: '3.6vh',
                'line-height': '3.5vh',
                width: '100%',
                position: "absolute",
                bottom: 0,
                'font-size': '14px',
                background: '#1074C2',
                overflow: 'hidden'
            }


            $("body").append($('<div/>', {
                class: 'footer',
                css: style

            }))
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
        })
    }

}