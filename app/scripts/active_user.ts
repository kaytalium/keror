import * as $ from 'jquery';
import { clearInterval } from 'timers';
import {activeUser} from './interface'

var users = [
    {
        image: "./default.png",
        fullname: "Ovel Heslop",
        firstname: "Ovel",
        lastname: "Heslop",
        status: "active"
    },
    {
        image: "./default.png",
        fullname: "John Brown",
        firstname: "John",
        lastname: "Brown",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Tamele Heslop",
        firstname: "Tamele",
        lastname: "Heslop",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Zamir Heslop",
        firstname: "Zamir",
        lastname: "Heslop",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Zuri Heslop",
        firstname: "Zuri",
        lastname: "Heslop",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Morlan Wilson",
        firstname: "Morlan",
        lastname: "Wilson",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Theodore Robinson",
        firstname: "Theodore",
        lastname: "Robinson",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Veronique Pitter",
        firstname: "Veronique",
        lastname: "Pitter",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Jodie Henry",
        firstname: "Jodie",
        lastname: "Henry",
        status: "inactive"
    },
    {
        image: "./default.png",
        fullname: "Rochelle Crawford",
        firstname: "Rochelle",
        lastname: "Crawford",
        status: "inactive"
    },

],
    template_user = (user: activeUser) => {
        return '<div class="users">' +
            '<div class="profile_img ' + user.status + '">' +
            '<img src="' + user.image + '" height="120" alt="">' +
            '</div>' +
            '<div class="name">' + user.fullname + '</div>' +
            '</div>';
    },
    templ_sidebar_user = (user: activeUser) => {
        return '<div class="view">' +
            '<div class="circle">' +
            '<img src="' + user.image + '" width="50" alt="">' +
            '</div>' +
            '<div class="s-name"><sapn class="icon"><i class="fa fa-check-circle ' + user.status + '" aria-hidden="true"></i></span> ' + user.firstname + '</div>' +
            '</div>';
    },
    pwd_widget_timer = setInterval(() => {
        var now = new Date().getTime();

        var distance = timelimit - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#timer').html(minutes.toString() + " : " + seconds.toString() + " Lapse: " + distance.toString())

        if(distance < 0 ){
            clearInterval(pwd_widget_timer)
            form.fadeOut('slow',function(){
                pwd.val('')
            })
        }
    }, 1000)

let display = $(".login_active")
let sidebar_display = $('.logged_users')
let switch_users = $('#switch_users')
let sidebar_close = $('.close')
let form = $('.frm')
let active_user = $('.users')
let pwd = $('#pwd')

var timelimit;

$(document).ready(function () {

    if (users.length == 1) {
        switch_users.delay(1000).fadeOut(600)
    }
    users.forEach(el => {
        if (el.status === 'active') {
            display.append(template_user(el))
            $(document).prop('title', 'Active user - ' + el.fullname);
            active_user = $('.users')
        }
        sidebar_display.append(templ_sidebar_user(el))


    })

    /**
     * control for the switch user icon 
     * This control will toggle the sidebar that will slide out from the right of the screen
     * and slide back in with closing
     */
    switch_users.click(function () {
        let n = sidebar_display.css("right")
        if (n == '-80px') {
            sidebar_display.css({ "border-left": "1px solid #40BEB4", "box-shadow": "5px 5px 5px 5px #40BEB4" })
            sidebar_display.animate({ "right": "0" }, "slow", function () {
                sidebar_close.fadeIn()
            })
        }

        if (n == '0px') {
            sidebar_display.animate({ "right": "-80" }, 900, function () {
                $(this).css({ "border-left": 0, "box-shadow": "none" })
            })
        }


    })


    /**
     * Activate the password input timeout and display password widget
     */
    active_user.click(() => {
        form.fadeIn('slow')
        timelimit = (new Date().getTime() + 5 * 60 * 1000);
    })

    pwd.focusin(function () {
        console.log('password input has focus')
        timelimit = (new Date().getTime() + 5 * 60 * 1000);
    })

    pwd.focusout(function () {
        console.log('focus out')
        // setTimeout(pwd_widget_timer(pwd), 10000)
    })

    pwd.keydown(function(){
        timelimit = (new Date().getTime() + 1 * 60 * 1000);
    })

    /**
     *  set up the timer to hide the password widget
     */
    form.hide();


})