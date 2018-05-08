"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var Clock;
(function (Clock) {
    let days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    let mnth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function time() {
        return rxjs_1.Observable.create(function (obs) {
            setInterval(function () {
                let now = new Date();
                let time = standard(now);
                obs.next(time.fullTime);
            }, 1000);
        });
    }
    Clock.time = time;
    /**
     * This function formatted time to its caller
     * @param d Date
     */
    function standard(d) {
        let hrs = d.getHours();
        let min = d.getMinutes();
        let sec = d.getSeconds();
        var state = {
            mid: '',
            hrs: 0,
            min: (min < 10 ? '0' + min : min),
            sec: (sec < 10 ? '0' + sec : sec),
            fullTime: ""
        };
        if (hrs > 11 && hrs < 24) {
            state.mid = "PM";
            state.hrs = (hrs - 12 == 0 ? 12 : hrs - 12);
        }
        else if (hrs < 12) {
            state.mid = "AM";
            state.hrs = (hrs == 0 ? 12 : hrs);
        }
        state.fullTime = state.hrs.toString() + ":" + state.min + " " + state.mid;
        return state;
    }
    /**
     * This fn return the formatted day with date and month
     * @returns Day month date: Fri Dec 29
     */
    function today() {
        let now = new Date();
        let date = now.getDate();
        let day = now.getDay();
        let month = now.getMonth();
        let fullday = days[day] + " " + date + " " + mnth[month];
        return fullday;
    }
    Clock.today = today;
})(Clock = exports.Clock || (exports.Clock = {}));
var timer;
(function (timer) {
    /**
     *
     */
    let timelimit;
    /**
     * This assign the timmer in minutes
     * @param m minutes
     */
    timer.limit = (m) => {
        timelimit = (new Date().getTime() + m * 60 * 1000);
    };
    /**
     *
     */
    function ticker() {
        return rxjs_1.Observable.create(function (obs) {
            let x = setInterval(function () {
                var now = new Date().getTime();
                let showTicker;
                var distance = timelimit - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                showTicker = minutes.toString() + " : " + seconds.toString() + " Lapse: " + distance.toString();
                obs.next(showTicker);
                if (distance < 0) {
                    clearInterval(x);
                    obs.complete();
                }
            });
        }, 1000);
    }
    timer.ticker = ticker;
})(timer = exports.timer || (exports.timer = {}));
