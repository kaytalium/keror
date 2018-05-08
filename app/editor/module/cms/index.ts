import * as $ from 'jquery'
import './../../../common/objectExtensions'
import {DATA} from './model/customerList'

export module cms {

    var container;
    export let load = () => {

        //get the stylesheet for this module and load it in the calling script header tag
        let styleURL = `file://${__dirname}/css/cmsStyles.css`;

        $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');

        container = $('<div/>', {
            class: 'cms-wrapper'
        })

        let control = $('<div/>', {
            class: 'cms-page-controls'
        }).load(`file://${__dirname}/view/controls.html`)
        control.appendTo(container)

        let tableList = $('<div/>', {
            class: 'cms-queue'
        }).load(`file://${__dirname}/view/queue.html`)
        tableList.appendTo(container)


        return container;
    }

    export let loadTableData = () => {
        $(document).ready(function () {
            let table = $('.cms-queue-table')
            let pageDisplayCounter = $('.cms-control-counter');

            pageDisplayCounter.html('1-' + DATA.length.toString() + ' of ' + DATA.length.toString())
            DATA.sort(compare)
            DATA.forEach(element => {
                let tr = $('<tr/>', {
                    'info': element,
                    click: function () {
                        handleRowClick(element)
                    }
                })
                let td = "<td class='cms-status-" + element.status + "'><i class='fa fa-circle' aria-hidden='true'></i></td>" +
                    "<td>" + element.status + "</td>" +
                    "<td>" + element.accountNumber + "</td>" +
                    "<td>" + element.accountHolder + "</td>" +
                    "<td class='cms-text-status-" + element.status + "'>" + element.balance.money() + "</td>" +
                    "<td><div class='cms-lst-pmt'>" +
                    "<span>" + new Date(element.lastPayment.date).kerorFormat() + "</span>" +
                    "<span>" + element.lastPayment.amount.money() + "</span></div></td>";
                tr.append(td)
                table.append(tr)

            });
        })

    }
}

function handleRowClick(data) {
    let main = $('.cms-wrapper')
    $(".cms-queue").remove()
    let detail = $('<div/>', {
        class: 'cms-detail'
    }).load(`file://${__dirname}/view/detail.html`)
    main.append(detail)
}



function compare(a, b) {
    if (a.lastPayment.date < b.lastPayment.date)
        return 1;
    if (a.lastPayment.date > b.lastPayment.date)
        return -1;
    return 0;
}

