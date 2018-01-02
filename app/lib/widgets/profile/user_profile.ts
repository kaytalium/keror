import * as $ from 'jquery';
import * as interfaces from './interface'
import { notifier } from './lib/notification'
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

/**
 * create var for holding the data coming from the footer.yml file
 */
let appTheme: interfaces.AppTheme;

try {
    let data = fs.readFileSync('./app/config/appTheme.yml', 'utf8');
    appTheme = yaml.load(data)
    // console.log(appTheme)
} catch (e) {
    console.log(e);
}


$(document).ready(function () {
    let PROFILE_ELEMENTS = {
        p_avatar_el: $('.p-avatar'),
        avatar_detail_el: $('.p-avatar-detail'),
        p_notification_indicator_el: $('.p-notification-indicator'),
        p_notification_detail_el: $('.p-notification-detail'),
        p_notification_list: $('.p-notification-list'),
        nv_container_el: $('.notification-view'),
        nv_close_el: $('.nv-close'),
        p_notification_list_icon: '<i class="fa fa-bell-o" aria-hidden="true"></i>',
        pnl_li: function (obj) {
            return '<div class="p-notification-list-ih" style="background: url(' + obj.imageUrl + '); background-size: cover;"></div>' +
                '<div class="p-notification-list-info">' +
                '<div class="p-notification-list-info-status">' + obj.status + '</div>' +
                '<div class="p-notification-list-info-title">' + obj.title + '</div>' +
                '<div class="p-notification-list-info-detail">' + obj.info + '</div>' +
                '</div>'
        }
    }

    PROFILE_ELEMENTS.nv_close_el.click(function(){
        PROFILE_ELEMENTS.nv_container_el.hide()
    })


    PROFILE_ELEMENTS.p_avatar_el.click(function () {
        PROFILE_ELEMENTS.avatar_detail_el.fadeToggle('slow');
    })

    PROFILE_ELEMENTS.p_notification_indicator_el.click(function () {

        PROFILE_ELEMENTS.p_notification_detail_el.fadeToggle('slow')

        if (!notifier.checker)
            PROFILE_ELEMENTS.p_notification_list.html('All up to date')


    })

    /**
     * check for notification and update the bell icon with count of notifications
     */
    updateNotification()



    /**
     * Paint notification to UI
     */
    function updateNotification() {
        if (notifier.checker()) {
            PROFILE_ELEMENTS.p_notification_indicator_el.html(notifier.unreadCount)
            PROFILE_ELEMENTS.p_notification_list.html('')
            notifier.unread.forEach(ob => {
                let li = $('<li/>')
                    .click(function () { HandleNotificationClicks(ob) })
                    .addClass('pnl')
                    .attr("info", ob)

                li.append(PROFILE_ELEMENTS.pnl_li(ob))
                li.appendTo(PROFILE_ELEMENTS.p_notification_list)
            })
        }
        else{
            PROFILE_ELEMENTS.p_notification_indicator_el.html(PROFILE_ELEMENTS.p_notification_list_icon)
            PROFILE_ELEMENTS.p_notification_list.css({display: "flex", 'flex-direction': "column", 'justify-content': "center", color: "#333", 'text-align':"center" })
            PROFILE_ELEMENTS.p_notification_list.html('All caught up!')
        }
            


    }


    /**
     * Handle the click of the notification items being displayed
     * @param el Calling element that was clicked
     */
    let HandleNotificationClicks = (n_obj: interfaces.NotificationMessage) => {
        //navigate user to view notice 
        

        //set status of notice and update database
        n_obj.read = true
        n_obj.status = ""

        notifier.updater(n_obj);
        global.setTimeout(function(){
            updateNotification()
            PROFILE_ELEMENTS.nv_container_el.show()
        },500)
        
        
            
        





    }


    /**
     * esc key and off click for the search result 
     */
    $(document).keyup(e => {
        let key = e.keyCode || e.charCode

        if (key == 27)
            PROFILE_ELEMENTS.avatar_detail_el.hide()
        PROFILE_ELEMENTS.p_notification_detail_el.hide()
    })

    $(document).click(function (e) {
        let profileClasses = ['p-avatar', 'p-avatar-detail', 'p-usertype', 'p-useremail', 'p-username', 'mini-footer']
        let notificationClasses = ['fa fa-bell-o', 'p-notification-indicator', 'p-notification-header', 'arrow-up p-notification-au', 'p-notification-detail', 'p-notification-list'];
        let target = e.target.className;
        // console.log(target)
        if (profileClasses.indexOf(target) < 0)
            PROFILE_ELEMENTS.avatar_detail_el.fadeOut(300)

        if (notificationClasses.indexOf(target) < 0)
            PROFILE_ELEMENTS.p_notification_detail_el.fadeOut(300)

    })
})