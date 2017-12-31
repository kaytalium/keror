import * as $ from 'jquery';
import { AppTheme } from './interface'
import './footer'
import { DataSearch, Calculator, Detector } from './lib/searchable'


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
let appTheme: AppTheme;

try {
    let data = fs.readFileSync('./app/config/appTheme.yml', 'utf8');
    appTheme = yaml.load(data)
    // console.log(appTheme)
} catch (e) {
    console.log(e);
}

$(document).ready(function () {
    $('body').css(Object.assign(appTheme.default.backgroundTheme))
    $('head').append('<link rel="stylesheet" href="' + appTheme.default.info.file + '" type="text/css" />');

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

    /**
     * Search keyup control for search
     */
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
                            console.log(data)
                        })
                } else if (switcher.Search) {
                    DataSearch.search(searchWord)
                        .result(function (data) {
                            if (data) {
                                //clear the display containers of old data before painting the new data to screen
                                ul.html('')
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
    $(document).keyup(e=>{
        let key = e.keyCode || e.charCode

        if(key == 27)
        SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')
    })

    $(document).click(function(e){
        let obj = ['s-co-icon','s-result-count','s-footer','result','s-search-result-holder','s-input','word','s-result-note']
        let target = e.target.className;

        if(obj.indexOf(target)<0)
            SEARCH_RESULT_ELEMENTS.container.fadeOut('slow')
    
    })


})

