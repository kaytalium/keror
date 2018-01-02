import * as $ from 'jquery';

export let main_login = ()=>{
    return $('<div/>').load('./lib/login/view/login.html')
}

export let active_user = ()=>{
    return $('<div/>').load('./lib/login/view/activeUser.html')
}