"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
var notification;
(function (notification) {
    notification.unread = [];
    notification.unreadCount = '0';
    notification.load = () => {
        $(document).ready(function () {
            let UI = '<div class="arrow-up notification-au"></div>' +
                '<div class="notification-header">Knymbus</div>' +
                '<ul class="notification-list"></ul>' +
                '<div class="notification-footer"><div>See All Notifications <i class="fa fa-angle-right" aria-hidden="true"></i></div></div>';
            let ELEMENTS = {
                nv_close_el: $('.nv-close'),
                icon: '<i class="fa fa-bell-o" aria-hidden="true"></i>',
                pnl_li: function (obj) {
                    return '<div class="notification-list-ih" style="background: url(' + obj.imageUrl + '); background-size: cover;"></div>' +
                        '<div class="notification-list-info">' +
                        '<div class="notification-list-info-status">' + obj.status + '</div>' +
                        '<div class="notification-list-info-title">' + obj.title + '</div>' +
                        '<div class="notification-list-info-detail">' + obj.info + '</div>' +
                        '</div>';
                }
            };
            let styleURL = `file://${__dirname}/css/styles.css`;
            //Add search style to the document
            $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');
            let anchor = $('notification');
            let n_icon = $('<div/>', {
                class: 'notification-icon',
            }).append(ELEMENTS.icon);
            let n_counter = $('<div/>', {
                class: 'notification-counter'
            }).appendTo(anchor);
            let detail = $('<div/>', {
                class: 'notification-detail'
            }).append(UI);
            anchor.append(n_icon)
                .append(detail);
            let detail_list = $('.notification-list');
            n_icon.click(function () {
                detail.fadeToggle('slow');
                if (!checker)
                    detail_list.html('All up to date');
            });
            /**
             * check for notification and update the bell icon with count of notifications
             */
            updateNotification();
            /**
             * Handle the click of the notification items being displayed
             * @param el Calling element that was clicked
             */
            let HandleNotificationClicks = (n_obj) => {
                //navigate user to view notice 
                detail.fadeToggle();
                //set status of notice and update database
                n_obj.read = true;
                n_obj.status = "";
                updater(n_obj);
                global.setTimeout(function () {
                    updateNotification();
                    //ELEMENTS.nv_container_el.show()
                }, 500);
            };
            function updateNotification() {
                if (checker()) {
                    n_counter.html(notification.unreadCount);
                    detail_list.html('');
                    notification.unread.forEach(ob => {
                        let li = $('<li/>')
                            .click(function () { HandleNotificationClicks(ob); })
                            .addClass('pnl')
                            .attr("info", ob);
                        li.append(ELEMENTS.pnl_li(ob));
                        li.appendTo(detail_list);
                    });
                }
                else {
                    n_counter.hide().html('');
                    detail_list.css({ display: "flex", 'flex-direction': "column", 'justify-content': "center", color: "#333", 'text-align': "center" });
                    detail_list.html('All caught up!');
                }
            }
            $(document).keyup(e => {
                let key = e.keyCode || e.charCode;
                if (key == 27)
                    detail.hide();
            });
            $(document).click(function (e) {
                let notificationClasses = ['fa fa-bell-o', 'notification-icon', 'notification-header', 'arrow-up notification-au', 'notification-detail', 'notification-list'];
                let target = e.target.className;
                // console.log(target)
                if (notificationClasses.indexOf(target) < 0)
                    detail.fadeOut(300);
            });
        });
    };
    function checker() {
        notification.unread = MESSAGES.filter((obj) => {
            return obj.read == false;
        });
        notification.unreadCount = notification.unread.length.toString();
        if (notification.unread.length > 0)
            return true;
        else
            return false;
    }
    notification.checker = checker;
    /**
     *
     */
    function updater(msg) {
        let index = MESSAGES.findIndex(obj => obj.id == msg.id);
        MESSAGES[index] = msg;
    }
    notification.updater = updater;
})(notification = exports.notification || (exports.notification = {}));
/**
 * Stimulating the notification messages
 */
const MESSAGES = [
    {
        id: "0001",
        imageUrl: "./../../../../assets/img/system/settings.png",
        title: "New Updates Available",
        info: "Version 1.0.1 comes with security updates and more",
        read: false,
        status: 'New',
        category: "systems"
    },
    {
        id: "0002",
        imageUrl: "./../../../../assets/img/system/alarm.jpg",
        title: "Reminder - John Brown",
        info: "Call back John Brown to find out if payment was made to the account as promise",
        read: false,
        status: "New",
        category: "reminder"
    },
    {
        id: "0003",
        imageUrl: "./../../../../assets/img/system/alarm.jpg",
        title: "Reminder - general staff meeting",
        info: "to write speech for CEO before 3:00pm today ",
        read: false,
        status: "New",
        category: "reminder"
    },
    {
        id: "0004",
        imageUrl: "./../../../../assets/img/system/logo.png",
        title: "General staff meeting",
        info: "Meeating schedule for January 25, 2019 ",
        read: false,
        status: "New",
        category: "general"
    },
    {
        id: "0005",
        imageUrl: "./../../../../assets/img/system/alarm.jpg",
        title: "reminder - Mary Sue",
        info: "Will be stopping by today to check out office computer ",
        read: false,
        status: "New",
        category: "reminder"
    },
    {
        id: "0006",
        imageUrl: "./../../../../assets/img/system/logo.png",
        title: "Gate Security Meeting",
        info: "Meeting of the gate security schedule for tonight @ 8:00 PM",
        read: false,
        status: "New",
        category: "general"
    }
];
// < div class="notification-view" >
//     <div class="nv-cover" > </div>
//         < div class="nv-model" >
//             <div class="nv-header" >
//                 <div class="nv-title" > Reminder - John Brown < /div>
//                     < div class="nv-close" > X < /div>
//                         < /div>
//                         < div class="nv-content" >
//                             <div class="nv-info" >
//                                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Odit inventore praesentium repudiandae maiores veniam placeat cumque eos, ipsum laudantium totam voluptates, obcaecati, dolorem ratione hic ipsam! Eligendi excepturi neque doloremque! < /p>
//                                     < div class="nv-btn" >
//                                         go to Account
//                                             < /div>
//                                             < /div>
//                                             < /div>
//                                             < /div>
//                                             < /div> 
