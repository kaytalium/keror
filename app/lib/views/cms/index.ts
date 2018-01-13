import * as $ from 'jquery'
import './objectExtensions'
import { notes } from '../../widgets/notes'
export module cms {

    var container;
    export let load = () => {

        //get the stylesheet for this module and load it in the calling script header tag
        let styleURL = `file://${__dirname}/cmsStyles.css`;

        $('head').append('<link rel="stylesheet" href="' + styleURL + '" type="text/css" />');

        container = $('<div/>', {
            class: 'cms-wrapper'
        })

        let control = $('<div/>', {
            class: 'cms-page-controls'
        }).load(`file://${__dirname}/controls.html`)
        control.appendTo(container)

        let tableList = $('<div/>', {
            class: 'cms-queue'
        }).load(`file://${__dirname}/queue.html`)
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
    }).load(`file://${__dirname}/detail.html`)
    main.append(detail)
}



function compare(a, b) {
    if (a.lastPayment.date < b.lastPayment.date)
        return 1;
    if (a.lastPayment.date > b.lastPayment.date)
        return -1;
    return 0;
}
let DATA = [
    {
        status: 'Normal',
        accountNumber: '7-1200',
        accountHolder: 'Mary Wright',
        balance: 12000,
        lastPayment: {
            date: new Date('Jan 12, 2017').getTime(),
            amount: 24000
        },
    },
    {
        status: 'Normal',
        accountNumber: '3-0345',
        accountHolder: 'Roy Moore',
        balance: 2000,
        lastPayment: {
            date: new Date('Nov 01, 2017').getTime(),
            amount: 3000
        }
    },
    {
        status: 'Warning',
        accountNumber: '1-1396',
        accountHolder: 'Bridgette Reid',
        balance: -2000,
        lastPayment: {
            date: new Date('Sep 25, 2017').getTime(),
            amount: 5000
        }
    },
    {
        status: 'Bad',
        accountNumber: '5-0563',
        accountHolder: 'Bruce Green',
        balance: -7000,
        lastPayment: {
            date: new Date('May 23, 2017').getTime(),
            amount: 1000
        }
    },
    {
        status: 'Bad',
        accountNumber: '5-0503',
        accountHolder: 'Alfred Winters',
        balance: -23000,
        lastPayment: {
            date: new Date('Jan 02, 2018').getTime(),
            amount: 1000
        }
    },
    {
        status: 'Bad',
        accountNumber: '6-1253',
        accountHolder: 'Andrea Scott',
        balance: -43000,
        lastPayment: {
            date: new Date('May 25, 2016').getTime(),
            amount: 5000
        }
    },
    {
        status: 'Normal',
        accountNumber: '6-1247',
        accountHolder: 'Paul Brown',
        balance: 4000,
        lastPayment: {
            date: new Date('Nov 17, 2017').getTime(),
            amount: 10000
        }
    },
    {
        status: 'Warning',
        accountNumber: '6-1293',
        accountHolder: 'Kimberley Jones',
        balance: -3000,
        lastPayment: {
            date: new Date('Apr 22, 2017').getTime(),
            amount: 6000
        }
    }
]
