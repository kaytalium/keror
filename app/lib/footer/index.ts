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
import { Clock } from './../widgets'
import { settings } from 'cluster';

export module footer {

    /**
     * Get the footer style from the yaml file
     */
    let styles

    try{
        styles = yaml.safeLoad(fs.readFileSync('./app/lib/footer/style.yml','utf8'))
    }catch (e){
        console.log(e)
    }
    /**
     * Get the current app version to display in ui
     */
    var APPVERSION = '1.0.0'

    export let load = () => {

        /**
         * When the document is ready, load the footer in the calling document 
         */

        $(document).ready(function () {

            
            // Add the footer div to the body element 
            $("body").append($('<div/>', {
                class: 'footer',
                css: styles.footer
            }))

            /**
            * Load the various footer widgets
            */
            $('.footer')
                .append(settingCog())
                .append(appVersion())
                .append(copyright())
                .append(clock())
                .append(timeDate())
                
        })
    }

    /**
     * 
     */
    function settingCog(){
        return $('<div/>',{
            class:'cog',
            css: styles.cog.css
        }).append(styles.cog.icon)
    }


    /**
     * 
     */
    function appVersion(){
        return $('<div/>',{
            class: 'version',
            css: styles.version.css
        }).append(styles.version.icon)
          .append(' v'+APPVERSION)
    }

    /**
     * 
     */
    function clock(){
        let clock_el =  $('<div/>',{
            class:'clock',
            css: styles.clock.css
        })

        Clock.time().subscribe((v) => {
            $('.clock').html(v)
        })

        return clock_el;
    }

    /**
     * 
     */
    function timeDate(){
        return $('<div/>',{
            css: styles.date.css
        }).html(Clock.today)
    }

    /**
     * 
     */
    function copyright(){
        return $('<div/>',{
            css: styles.copyright.css
        }).html(styles.copyright.info)
    }

}