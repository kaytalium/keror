import * as $ from 'jquery'
import './objectExtensions'

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
        accountNumber: '1200',
        accountHolder: 'Marie Wright',
        balance: 12000,
        lastPayment: {
            date: new Date('Jan 12, 2017').getTime(),
            amount: 24000
        },
    },
    {
        status: 'Normal',
        accountNumber: '0345',
        accountHolder: 'Roy Moore',
        balance: 2000,
        lastPayment: {
            date: new Date('Nov 01, 2017').getTime(),
            amount: 3000
        }
    },
    {
        status: 'Warning',
        accountNumber: '1396',
        accountHolder: 'Bridgette Reid',
        balance: -2000,
        lastPayment: {
            date: new Date('Sep 25, 2017').getTime(),
            amount: 5000
        }
    },
    {
        status: 'Bad',
        accountNumber: '0563',
        accountHolder: 'Bruce Green',
        balance: -7000,
        lastPayment: {
            date: new Date('May 23, 2017').getTime(),
            amount: 1000
        }
    },
    {
        status: 'Bad',
        accountNumber: '0503',
        accountHolder: 'Alfred Winters',
        balance: -23000,
        lastPayment: {
            date: new Date('Jan 02, 2018').getTime(),
            amount: 1000
        }
    },
    {
        status: 'Bad',
        accountNumber: '1253',
        accountHolder: 'Andrea Scott',
        balance: -43000,
        lastPayment: {
            date: new Date('May 25, 2016').getTime(),
            amount: 5000
        }
    },
    {
        status: 'Normal',
        accountNumber: '1247',
        accountHolder: 'Paul Brown',
        balance: 4000,
        lastPayment: {
            date: new Date('Nov 17, 2017').getTime(),
            amount: 10000
        }
    },
    {
        status: 'Warning',
        accountNumber: '1293',
        accountHolder: 'Kimberley Jones',
        balance: -3000,
        lastPayment: {
            date: new Date('Apr 22, 2017').getTime(),
            amount: 6000
        }
    },
    {
        accountNumber:"0009",
        accountHolder:"Aundrea Mollnar",
        email:"amollnar0@imdb.com",
        status:"Bad",
        balance:-177932.07,
        lastPayment:{
            date: new Date("1/10/2015").getTime(), 
            amount:8038.08
        }
    },
    {
        accountNumber:"0001",
        accountHolder:"Betty Linner",
        email:"blinner1@eepurl.com",
        status:"Bad",
        balance:-168231.85,
        lastPayment:{
            date: new Date("4/25/2014").getTime(), 
            amount:7184.67
        }
    },
    {
        accountNumber:"0002",
        accountHolder:"Darcey Dyson",
        email:"ddyson2@comcast.net",
        status:"Bad",
        balance:-102825.65,
        lastPayment:{
            date: new Date("5/27/2013").getTime(), 
            amount:23795.65
        }
    },
    {
        accountNumber:"0891",
        accountHolder:"Felipa Girvan",
        email:"fgirvan3@themeforest.net",
        status:"Bad",
        balance:-69081.18,
        lastPayment:{
            date: new Date("4/8/2014").getTime(), 
            amount:9099.45
        }
    },
    {
        accountNumber:"0748",
        accountHolder:"Carlotta Daines",
        email:"cdaines1x@ucoz.com",
        status:"Bad",
        balance:-44735.53,
        lastPayment:{
            date: new Date("2/18/2016").getTime(),
            amount:9650.42
        }
    },
    {
        accountNumber:"5839",
        accountHolder:"Brod Coveney",
        email:"bcoveney1y@instagram.com",
        status:"Bad",
        balance:-37458.16,
        lastPayment:{
            date: new Date("8/25/2013").getTime(),
            amount:9489.36
        }
    },
    {
        accountNumber:"4412",
        accountHolder:"Cori Kensitt",
        email:"ckensittrr@g.com",
        status:"Bad",
        balance:-175661.08,
        lastPayment:{
            date: new Date("12/26/2015").getTime(),
            amount:9805.80
        }
    },
    {"accountNumber":"5414","accountHolder":"Joly Starford","email":"jstarford6@smugmug.com","status":"Bad","balance":-100282.76,"lastPayment":{date: new Date("6/17/2015").getTime(),"amount":18394.99}},
{"accountNumber":"0578","accountHolder":"Aleta Wootton","email":"awootton7@dell.com","status":"Bad","balance":-39105.19,"lastPayment":{date: new Date("6/18/2013").getTime(),"amount":6667.89}},
{"accountNumber":"6200","accountHolder":"Waylon Piccop","email":"wpiccop8@newsvine.com","status":"Bad","balance":-147191.85,"lastPayment":{date: new Date("4/27/2015").getTime(),"amount":17530.23}},
{"accountNumber":"7977","accountHolder":"Karylin Gudgin","email":"kgudgin9@com.com","status":"Bad","balance":-138729.42,"lastPayment":{date: new Date("7/30/2013").getTime(),"amount":19074.55}},
{"accountNumber":"9490","accountHolder":"Kaylyn Dunsire","email":"kdunsirea@youku.com","status":"Bad","balance":-49892.82,"lastPayment":{date: new Date("11/9/2015").getTime(),"amount":1185.76}},
{"accountNumber":"4463","accountHolder":"Lia Goracci","email":"lgoraccib@wsj.com","status":"Bad","balance":-77741.73,"lastPayment":{date: new Date("1/29/2015").getTime(),"amount":24351.95}},
{"accountNumber":"9098","accountHolder":"Willis Gregory","email":"wgregoryc@desdev.cn","status":"Normal","balance":5828.09,"lastPayment":{date: new Date("4/2/2014"),"amount":6560.64}},
{"accountNumber":"5876","accountHolder":"Bord Alvar","email":"balvard@xing.com","status":"Bad","balance":-54001.00,"lastPayment":{date: new Date("1/3/2017"),"amount":13806.3}},
{"accountNumber":"1329","accountHolder":"Munroe De Lascy","email":"mdee@tinypic.com","status":"Bad","balance":-138816.41,"lastPayment":{date: new Date("1/27/2018"),"amount":16830.08}},
{"accountNumber":"2340","accountHolder":"Donny Bordes","email":"dbordesf@squarespace.com","status":"Normal","balance":19807.94,"lastPayment":{date: new Date("2/16/2017"),"amount":14307.09}},
{"accountNumber":"1062","accountHolder":"Vernor Kilfedder","email":"vkilfedderg@cyberchimps.com","status":"Bad","balance":-42832.48,"lastPayment":{date: new Date("12/20/2013"),"amount":16222.45}},
{"accountNumber":"0874","accountHolder":"Marten Henrichsen","email":"mhenrichsenh@github.com","status":"Bad","balance":-98425.12,"lastPayment":{date: new Date("3/26/2015"),"amount":9990.57}},
{"accountNumber":"0988","accountHolder":"Gabriel Crombleholme","email":"gcrombleholmei@hibu.com","status":"Warning","balance":-6608.51,"lastPayment":{date: new Date("12/30/2013"),"amount":22568.76}},
{"accountNumber":"0644","accountHolder":"Lanie Embling","email":"lemblingj@sogou.com","status":"Bad","balance":-112259.47,"lastPayment":{date: new Date("3/26/2015"),"amount":9411.16}},
{"accountNumber":"0586","accountHolder":"Meg Hargrave","email":"mhargravek@tuttocitta.it","status":"Bad","balance":-135754.33,"lastPayment":{date: new Date("11/18/2017"),"amount":27702.97}},
{"accountNumber":"6449","accountHolder":"Mohammed Puncher","email":"mpuncherl@ucoz.ru","status":"Bad","balance":-56968.41,"lastPayment":{date: new Date("12/28/2017"),"amount":7437.65}},
{"accountNumber":"8098","accountHolder":"Brinn Matthensen","email":"bmatthensenm@blog.com","status":"Normal","balance":48633.92,"lastPayment":{date: new Date("1/30/2018"),"amount":10689.91}},
{"accountNumber":"3078","accountHolder":"Giraldo Naden","email":"gnadenn@domainmarket.com","status":"Bad","balance":-54495.01,"lastPayment":{date: new Date("5/1/2016"),"amount":1397.58}},
{"accountNumber":"9814","accountHolder":"Darcy Dowker","email":"ddowkero@google.com.hk","status":"Normal","balance":123233.15,"lastPayment":{date: new Date("3/20/2014"),"amount":5020.78}},
{"accountNumber":"0270","accountHolder":"Bord Domino","email":"bdominop@instagram.com","status":"Bad","balance":-124716.46,"lastPayment":{date: new Date("6/15/2015"),"amount":23542.37}},
{"accountNumber":"3452","accountHolder":"Willa Lucy","email":"wlucyq@ning.com","status":"Warning","balance":-3739.37,"lastPayment":{date: new Date("12/7/2015"),"amount":15115.25}},
{"accountNumber":"2098","accountHolder":"Vittorio Le Fleming","email":"vler@europa.eu","status":"Warning","balance":-7848.22,"lastPayment":{date: new Date("12/18/2014"),"amount":15226.61}},
{"accountNumber":"3111","accountHolder":"Maria McGahey","email":"mmcgaheys@who.int","status":"Bad","balance":-42862.56,"lastPayment":{date: new Date("8/18/2016"),"amount":25876.40}},
{"accountNumber":"4994","accountHolder":"Reider Craik","email":"rcraikt@people.com.cn","status":"Bad","balance":-128431.05,"lastPayment":{date: new Date("6/16/2016"),"amount":15514.27}},
{"accountNumber":"2629","accountHolder":"Kettie Tratton","email":"ktrattonu@senate.gov","status":"Normal","balance":10080.17,"lastPayment":{date: new Date("4/10/2017"),"amount":22636.43}},
{"accountNumber":"7368","accountHolder":"Yoshiko Odo","email":"yodov@jimdo.com","status":"Normal","balance":12464.19,"lastPayment":{date: new Date("12/19/2017"),"amount":27774.06}},
{"accountNumber":"0712","accountHolder":"Shirleen Ragdale","email":"sragdalew@sphinn.com","status":"Bad","balance":-121289.65,"lastPayment":{date: new Date("1/10/2018"),"amount":1110.14}},
{"accountNumber":"4987","accountHolder":"Fanechka Americi","email":"famericix@printfriendly.com","status":"Normal","balance":4552.81,"lastPayment":{date: new Date("4/25/2017"),"amount":2999.57}},
{"accountNumber":"4369","accountHolder":"Teresa Josofovitz","email":"tjosofovitzy@telegraph.co.uk","status":"Warning","balance":-5200.32,"lastPayment":{date: new Date("10/12/2017"),"amount":7684.54}},
{"accountNumber":"1274","accountHolder":"Zack Whorlton","email":"zwhorltonz@woothemes.com","status":"Bad","balance":-157331.38,"lastPayment":{date: new Date("7/18/2015"),"amount":20805.85}},
{"accountNumber":"6294","accountHolder":"Ellswerth Marzelle","email":"emarzelle10@oracle.com","status":"Warning","balance":-5982.87,"lastPayment":{date: new Date("5/10/2015"),"amount":27157.29}},
{"accountNumber":"4987","accountHolder":"Emelina Kilroy","email":"ekilroy11@tinyurl.com","status":"Normal","balance":16448.60,"lastPayment":{date: new Date("4/2/2014"),"amount":6891.50}},
{"accountNumber":"6248","accountHolder":"Nancy Mathwin","email":"nmathwin12@photobucket.com","status":"Bad","balance":-60831.76,"lastPayment":{date: new Date("8/13/2014"),"amount":7654.13}},
{"accountNumber":"3079","accountHolder":"Zerk Aberkirder","email":"zaberkirder13@etsy.com","status":"Bad","balance":-167752.84,"lastPayment":{date: new Date("4/12/2015"),"amount":21381.73}},
{"accountNumber":"9987","accountHolder":"Carlin Willerton","email":"cwillerton14@springer.com","status":"Bad","balance":-37954.12,"lastPayment":{date: new Date("3/12/2014"),"amount":12109.73}},
{"accountNumber":"6804","accountHolder":"Madel Schneider","email":"mschneider15@jimdo.com","status":"Normal","balance":64093.09,"lastPayment":{date: new Date("2/27/2017"),"amount":7603.88}},
{"accountNumber":"6206","accountHolder":"Mariellen Coppledike","email":"mcoppledike16@example.com","status":"Bad","balance":-175886.53,"lastPayment":{date: new Date("9/8/2016"),"amount":3739.66}},
{"accountNumber":"4212","accountHolder":"Mariya Rounsefull","email":"mrounsefull17@ning.com","status":"Bad","balance":-156107.52,"lastPayment":{date: new Date("3/31/2016"),"amount":10897.70}},
{"accountNumber":"0761","accountHolder":"Lindie Tennant","email":"ltennant18@facebook.com","status":"Bad","balance":-146164.76,"lastPayment":{date: new Date("3/29/2016"),"amount":16658.30}},
{"accountNumber":"6082","accountHolder":"Meg Crutchley","email":"mcrutchley19@comsenz.com","status":"Normal","balance":9223.31,"lastPayment":{date: new Date("10/26/2016"),"amount":14131.45}},
{"accountNumber":"2383","accountHolder":"Jeremie Luce","email":"jluce1a@marriott.com","status":"Normal","balance":108354.00,"lastPayment":{date: new Date("7/12/2013"),"amount":19852.16}},
{"accountNumber":"6712","accountHolder":"Hyacinthia Clever","email":"hclever1b@msn.com","status":"Bad","balance":-87266.04,"lastPayment":{date: new Date("12/22/2016"),"amount":15086.21}},
{"accountNumber":"7954","accountHolder":"Morley Yearby","email":"myearby1c@hostgator.com","status":"Bad","balance":-174491.90,"lastPayment":{date: new Date("2/15/2018"),"amount":6960.23}},
{"accountNumber":"1073","accountHolder":"Mendie Carillo","email":"mcarillo1d@yelp.com","status":"Warning","balance":-1653.79,"lastPayment":{date: new Date("4/23/2014"),"amount":11161.95}},
{"accountNumber":"6123","accountHolder":"Carrie Verbrugge","email":"cverbrugge1e@walmart.com","status":"Bad","balance":-88285.34,"lastPayment":{date: new Date("4/9/2016"),"amount":12650.46}},
{"accountNumber":"3286","accountHolder":"Andrey Cazalet","email":"acazalet1f@mail.ru","status":"Bad","balance":-107885.74,"lastPayment":{date: new Date("4/29/2015"),"amount":20758.29}},
{"accountNumber":"0546","accountHolder":"Anna-maria Murrigan","email":"amurrigan1g@slate.com","status":"Bad","balance":-161363.71,"lastPayment":{date: new Date("6/13/2017"),"amount":4407.26}},
{"accountNumber":"5087","accountHolder":"Ajay Aguirrezabala","email":"aaguirrezabala1h@tripadvisor.com","status":"Bad","balance":-173755.04,"lastPayment":{date: new Date("12/18/2015"),"amount":9067.74}},
{"accountNumber":"8633","accountHolder":"Thomasa Portlock","email":"tportlock1i@unesco.org","status":"Normal","balance":98627.94,"lastPayment":{date: new Date("2/5/2018"),"amount":28374.30}},
{"accountNumber":"1493","accountHolder":"Rheta Willcock","email":"rwillcock1j@pen.io","status":"Bad","balance":-119310.59,"lastPayment":{date: new Date("8/31/2013"),"amount":28279.29}},
{"accountNumber":"3019","accountHolder":"Sophronia Hurren","email":"shurren1k@oaic.gov.au","status":"Normal","balance":7275.44,"lastPayment":{date: new Date("2/19/2014"),"amount":16609.60}},
{"accountNumber":"5875","accountHolder":"Myrle Drohun","email":"mdrohun1l@wordpress.org","status":"Bad","balance":-113231.88,"lastPayment":{date: new Date("1/5/2017"),"amount":29159.31}},
{"accountNumber":"1965","accountHolder":"Rakel Gellibrand","email":"rgellibrand1m@geocities.jp","status":"Bad","balance":-74368.04,"lastPayment":{date: new Date("8/10/2014"),"amount":17781.91}},
{"accountNumber":"6687","accountHolder":"Peggy Gartell","email":"pgartell1n@admin.ch","status":"Bad","balance":-137552.21,"lastPayment":{date: new Date("7/18/2013"),"amount":9983.54}},


]
