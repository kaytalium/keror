export module DataSearch{
    
    let SEARCH_RESULT;

    export function search(arg: string){
        SEARCH_RESULT = CUSTOMER.filter(obj=>{
            return obj.name.toLowerCase().includes(arg.toLowerCase()) || obj.lot.toString().includes(arg.toLowerCase()) 
            || obj.year.toLowerCase().includes(arg.toLowerCase())
            })
        return this;
    }

    export function result(cb: Function){
        if(SEARCH_RESULT){
            if(typeof cb === 'function')
            cb(SEARCH_RESULT)
        }
        
    }
}

export module Calculator{
    export function process(arg: string){
        return this;
    }

    export function result(cb: Function){
        cb('calculating...')
    }
}

export module Detector{

    export function checkInput(str: string, cb: Function){
        if(/^[a-zA-Z0-9- ]*$/.test(str) == false){
            //since we know that this is a calculator call we need to perform additional checks to make sure it is not a 
            //mistake non alphabethic 
            if(typeof cb === 'function')
            cb(JSON.stringify({Calculator: true}))
        }else{
            if(typeof cb === 'function')
            cb(JSON.stringify({Search: true}))
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

interface Customer{
    name: string,
    lastPaymentDate: string,
    year: string,
    status: number,
    lot: number
}