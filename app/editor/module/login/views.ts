import * as $ from 'jquery';
export module views {

    export let main_login = () => {
        return $('<div/>').load('./view/login.html')
    }

    export let active_user = () => {
        return $('<div/>').load('./view/activeUser.html')
    }
}