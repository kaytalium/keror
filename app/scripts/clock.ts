import { TimeState } from "./interface";
import { Observable } from 'rxjs'


export module clock {

    let days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    let mnth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    export function time(): Observable<any> {
        return Observable.create(function (obs) {
            setInterval(function () {
                let now: Date = new Date()
                let time: TimeState = standard(now);
                obs.next(time.fullTime)
            }, 1000);
        })
    }


    /**
     * This function formatted time to its caller
     * @param d Date 
     */
    function standard(d: Date): TimeState {

        let hrs = d.getHours();
        let min = d.getMinutes();
        let sec = d.getSeconds();

        var state: TimeState = {
            mid: '',
            hrs: 0,
            min: (min < 10 ? '0' + min : min),
            sec: (sec < 10 ? '0' + sec : sec),
            fullTime: ""
        }
        
        if (hrs > 11 && hrs < 24) {
            state.mid = "PM"
            state.hrs = (hrs - 12 == 0 ? 12 : hrs - 12)
        } else if (hrs < 12 || hrs == 24) {
            state.mid = "AM"
            state.hrs = (hrs - 12 == 0 ? 12 : hrs)
        }

        state.fullTime = state.hrs.toString() + ":" + state.min + ":" + state.sec + " " + state.mid;
        return state;
    }

    /**
     * This fn return the formatted day with date and month
     * @returns Day month date: Fri Dec 29 
     */
    export function today() {
        let now: Date = new Date()
        let date = now.getDate();
        let day = now.getDay();
        let month = now.getMonth();

        let fullday = days[day] + " " + mnth[month] + " " + date
        return fullday;
    }

}

export module timer {

    /**
     * 
     */
    let timelimit;


    /**
     * This assign the timmer in minutes 
     * @param m minutes
     */
    export let limit = (m: number) => {
        timelimit = (new Date().getTime() + m * 60 * 1000);
    }

    /**
     * 
     */
    export function ticker(): Observable<any> {
        return Observable.create(function (obs) {
            let x = setInterval(function () {
                var now = new Date().getTime();
                let showTicker: string;

                var distance = timelimit - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                showTicker = minutes.toString() + " : " + seconds.toString() + " Lapse: " + distance.toString()
                obs.next(showTicker)
                if (distance < 0) {
                    clearInterval(x)
                    obs.complete()
                }
            })

        }, 1000)


    }
}

