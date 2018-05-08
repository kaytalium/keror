import * as $ from 'jquery';
import { AppInterface as AI } from './../../../common/interface'
import { timer } from "kplugins"

var users: Array<AI.ActiveUser> = [
    {
        image: "./assets/img/default.png",
        fullname: "Ovel Heslop",
        firstname: "Ovel",
        lastname: "Heslop",
        status: "active",
        username: "heslopok@gmail.com",
        background_theme: false,
        background_url: "default"
    },
    {
        image: "./assets/img/default.png",
        fullname: "John Brown",
        firstname: "John",
        lastname: "Brown",
        status: "inactive",
        username: "brownJe@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg2.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Tamele Heslop",
        firstname: "Tamele",
        lastname: "Heslop",
        status: "inactive",
        username: "heslopta@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg3.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Zamir Heslop",
        firstname: "Zamir",
        lastname: "Heslop",
        status: "inactive",
        username: "heslopze@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg4.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Zuri Heslop",
        firstname: "Zuri",
        lastname: "Heslop",
        status: "inactive",
        username: "heslopzee@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg5.jpeg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Morlan Wilson",
        firstname: "Morlan",
        lastname: "Wilson",
        status: "inactive",
        username: "wilsonmm@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg6.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Theodore Robinson",
        firstname: "Theodore",
        lastname: "Robinson",
        status: "inactive",
        username: "robinsontd@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg7.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Veronique Pitter",
        firstname: "Veronique",
        lastname: "Pitter",
        status: "inactive",
        username: "pittervf@gmail.com",
        background_theme: true,
        background_url: "./assets/img/bg3.jpg"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Jodie Henry",
        firstname: "Jodie",
        lastname: "Henry",
        status: "inactive",
        username: "henryjd@gmail.com",
        background_theme: false,
        background_url: "default"
    },
    {
        image: "./assets/img/default.png",
        fullname: "Rochelle Crawford",
        firstname: "Rochelle",
        lastname: "Crawford",
        status: "inactive",
        username: "crawfordrr@gmail.com",
        background_theme: false,
        background_url: "default"
    }

],
    template_user = (user: AI.ActiveUser) => {
        return '<div class="user">' +
            '<div class="profile_img ' + user.status + '">' +
            '<img src="' + user.image + '" height="120" alt="">' +
            '</div>' +
            '<div class="name">' + user.fullname + '</div>' +
            '</div>';
    },
    templ_sidebar_user = (user: AI.ActiveUser) => {
        return '<div class="view" data-username="' + user.username + '">' +
            '<div class="circle">' +
            '<img src="' + user.image + '" width="50" alt="">' +
            '</div>' +
            '<div class="s-name"><sapn class="icon"><i class="fa fa-check-circle ' + user.status + '" aria-hidden="true"></i></span> ' + user.firstname + '</div>' +
            '</div>';
    }

let display = $(".login_active")
let sidebar_display = $('.logged_users')
let switch_users = $('#switch_users')
let sidebar_close = $('.close')
let form = $('.frm')
let active_user = $('.user')
let pwd = $('#pwd')
let new_user = $('#new_user')

var view = $('.view')


$(document).ready(function () {

    new_user.click(function(){
        $('.content').load("./views/login.html")
    })

    if (users.length == 1) {
        switch_users.delay(1000).fadeOut(600)
    }
    users.forEach(el => {
        if (el.status === 'active') {
            display.append(template_user(el))
            $(document).prop('title', 'Active user - ' + el.fullname);
            active_user = $('.user')
            if (el.background_theme) {
                $('body').css({ "background": "url('" + el.background_url + "')", "background-size": "cover" })
            }

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

        //assign the appended mini profile elements to a var
        view = $('.view')


        /**
         * Control for the mini profile element click 
         */
        view.click(function () {
            let username = $(this).data('username');
            let newUser: Array<AI.ActiveUser> = users.filter(function (el) {
                return el.username == username
            })

            newUser[0].isSwitching = true;
            display.html(template_user(newUser[0]))
            if (newUser[0].background_theme)
                $('body').css({ "background": "url('" + newUser[0].background_url + "')", "background-size": "cover" })
            else
                $('body').css({ "background": "url('./assets/img/bg1.jpg')", "background-size": "cover" })

            //$(document).prop('title', 'Active user - ' + newUser[0].fullname);
            active_user = $('.user')
            active_user.on('click', function () {
                form.fadeIn('slow', function () {
                    startTimer();
                })


            });

            active_user.trigger('click')
            switch_users.trigger('click')


        })
    })


    /**
     * Activate the password input timeout and display password widget
     */
    active_user.on("click", () => {
        form.fadeIn('slow', function () {
            startTimer();
        })

    })

    pwd.focusin(function () {
        console.log('password input has focus')
        timer.limit(5)
    })

    pwd.focusout(function () {
        console.log('focus out')
        
    })

    pwd.keydown(function () {
        timer.limit(1)
    })

    /**
     *  set up the timer to hide the password widget
     */
    form.hide();




})

function startTimer() {
    timer.limit(5)
    timer.ticker().subscribe({
        next: function (v) {
            //console.log(v)
            // $('#timer').html(v)
        },
        complete: function () {
            console.log("done")
            form.fadeOut('slow', function () {
                pwd.val('')
            })
        }
    })

}