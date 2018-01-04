import * as $ from 'jquery'
import { empty } from 'rxjs/observable/empty';
export module searchEngine {

    /**
     * search ui structure
     */
    let UI = '<div class="btn-wrapper">' +
        '<!--div class="btn"><i class="fa fa-search" aria-hidden="true"></i></div-->' +
        '</div>' +
        '<input type="search" name="search" placeholder="Search here" id="s" class="s-input" title="Search Engine" />' +
        '<div class="result">' +
        '<div class="s-info">' +
        '<ul class="s-search-result-holder"></ul>' +
        '</div>' +
        '<div class="s-footer">' + 
        '<div class="s-co-icon"></div>' +
        '<div class="s-result-count"></div>' +
        '<div class="s-more-r">show more</div>' +
        '</div>' +
        '</div>'


    export let load = () => {

        $(document).ready(function () {

            let styleURL = `file://${__dirname}/css/searchEngine.css`
            //Add search style to the document
            $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');

            //look for the search widget anchor 
            let anchor = $('searchwidget')

            anchor.addClass('search')

            anchor.append(UI)

            let input = $('.search').children('input')
            let ul = $('.s-info').children('ul')
            let SEARCH_RESULT_ELEMENTS = {
                li: function (data) {
                    return '<div class="li-indicator"></div><div class="lot">' + data.lot + '</div>' +
                        '<div class="owner">' + data.name + '</div>' +
                        '<div class="last"><div class="s-period"><month>' + data.lastPaymentDate + '</month><year>' + data.year + '</year></div><div class="s-status"><i class="fa fa-circle fa-sm" aria-hidden="true"></i></div></div>'
                },
                s_result_count: function (arg) {
                    return '<div class="s-result-note">Your Search for<span class="word">' + arg.word + '</span> return ' + arg.count + ' result' + (arg.count > 1 ? 's' : '') + '</div>';

                },
                container: $('.search').children('.result'),
                lot_el: $(".lot"),
                s_result_count_el: $('.s-result-count'),
                s_show_more_el: $(".s-more-r")

            }


            input.keyup(function (e) {
                let key = e.keyCode || e.charCode
                let $this = $(this)
                let valLn = $this.val().toString().length
                let searchWord = $this.val().toString();
                
                if (key == 27) {
                    SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')
                    return 0;
                }

                if (key == 8 && valLn == 0) {
                    SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')
                }
                //check the value if it is empty or not on val search only
                if (valLn > 0) {
                    Detector.checkInput(searchWord, function (switcher) {
                        switcher = JSON.parse(switcher);

                        if (switcher.Calculator) {
                            Calculator.process(searchWord)
                                .result(function (data) {
                                    ul.html('')
                                    let cal_res = $('<div/>', {
                                        class: 'cal_result_view'
                                    }).append($('<div/>', {
                                        class: 'expression'
                                    }).html(data.expression))
                                        .append($('<div/>', {
                                            class: "cal_result"
                                        }).html(data.result))
                                        .appendTo(ul)

                                    ul.addClass('calculator')

                                })
                        } else if (switcher.Search) {
                            DataSearch.search(searchWord)
                                .result(function (data) {
                                    if (data) {
                                        //clear the display containers of old data before painting the new data to screen

                                        ul.removeClass('calculator').html('')
                                        SEARCH_RESULT_ELEMENTS.s_result_count_el.html('')

                                        if (data.length > 10)
                                            SEARCH_RESULT_ELEMENTS.s_show_more_el.show()
                                        else
                                            SEARCH_RESULT_ELEMENTS.s_show_more_el.hide()

                                        let f_notice = SEARCH_RESULT_ELEMENTS.s_result_count({ word: searchWord, count: data.length })
                                        SEARCH_RESULT_ELEMENTS.s_result_count_el.append(f_notice)

                                        SEARCH_RESULT_ELEMENTS.container.fadeIn('slow')
                                    }
                                    data.forEach(el => {
                                        let li = $('<li/>');
                                        li.append(SEARCH_RESULT_ELEMENTS.li(el))
                                        li.appendTo(ul)
                                    });
                                })
                        }
                    })
                }


            })

            /**
             * esc key and off click for the search result 
             */
            $(document).keyup(e => {
                let key = e.keyCode || e.charCode

                if (key == 27)
                    SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')
            })

            $(document).click(function (e) {
                let obj = ['s-co-icon', 's-result-count', 's-footer', 'result', 's-search-result-holder', 's-input', 'word', 's-result-note']
                let target = e.target.className;

                if (obj.indexOf(target) < 0)
                    SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')

            })


        })
    }

}
export module DataSearch {

    let SEARCH_RESULT;

    export function search(arg: string) {
        SEARCH_RESULT = CUSTOMER.filter(obj => {
            return obj.name.toLowerCase().includes(arg.toLowerCase()) || obj.lot.toString().includes(arg.toLowerCase())
                || obj.year.toLowerCase().includes(arg.toLowerCase())
        })
        return this;
    }

    export function result(cb: Function) {
        if (SEARCH_RESULT) {
            if (typeof cb === 'function')
                cb(SEARCH_RESULT)
        }

    }
}

export module Calculator {

    let CALCULATED_RESULT: any;
    export function process(arg: string) {
        let total = 0;
        let expression = "";
        let values = arg.split('+')
        let emptyIndex = values.indexOf("")
        if (emptyIndex != -1)
            values.splice(emptyIndex, 1)

        console.log(emptyIndex)
        console.log(values)
        let len = values.length;
        values.forEach((num: string, index: number) => {
            console.log('num: ' + num)
            if(isNaN(parseInt(num)))
                return 
            if (len == 1)
                expression += num+' '
            else
                expression += num + ' + '

            len--;

            total += (isNaN(parseInt(num)) ? 0 : parseInt(num))
        })
        expression += ' =';
        // values = arg.split('-');
        // values.forEach((num: string)=>{
        //                 total -= (isNaN(parseInt(num))? 0: parseInt(num))
        //             })
        CALCULATED_RESULT = { result: total.toString(), expression: expression }
        return this;
    }

    export function result(cb: Function) {

        cb(CALCULATED_RESULT)
    }
}

export module Detector {

    export function checkInput(str: string, cb: Function) {
        if (/^[a-zA-Z0-9- ]*$/.test(str) == false) {
            //since we know that this is a calculator call we need to perform additional checks to make sure it is not a 
            //mistake non alphabethic 
            if (typeof cb === 'function')
                cb(JSON.stringify({ Calculator: true }))
        } else {
            if (typeof cb === 'function')
                cb(JSON.stringify({ Search: true }))
        }
    }
}

/**
 * Simulate data
 */
const CUSTOMER: Array<Customer> = [
    {
        name: "John Brown",
        lastPaymentDate: "Dec 2",
        year: "2014",
        status: 1, //
        lot: 1000
    },
    {
        name: "john Brown",
        lastPaymentDate: "Jun 22",
        year: "2016",
        status: 2,//
        lot: 1002
    },
    {
        name: "Kim Green",
        lastPaymentDate: "Jan 13",
        year: "2017",
        status: 3, //
        lot: 1003
    }
]

interface Customer {
    name: string,
    lastPaymentDate: string,
    year: string,
    status: number,
    lot: number
}