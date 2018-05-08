const storage = require('electron-json-storage');
import {AppInterface as AI} from './../interface'
import $ = require('jquery'); 
class validate {
    
    constructor() {

    }

    public isCleanAndValidated = function (user:AI.User):boolean{
        var state = true;
        var err = {
            usr_i:  $('#'+user.username.name),
            pwd_i:  $('#'+user.password.name),
            usr_e: $('#err_'+user.username.name),
            pwd_e:  $('#err_'+user.password.name)

        }

        //check if empty
        if(user.username.value.length <1){
            state =  false
            err.usr_i.css('border-bottom',"1px solid red");
            err.usr_e.delay(300).fadeIn(900)
            err.usr_e.html('No username or email was provided')
        }else
        
        //check if email is valid
        if(user.username.value.length>1 && !this.isEmail(user.username.value)){
            state =  false
            err.usr_i.css('border-bottom',"1px solid red");
            err.usr_e.delay(300).fadeIn(900)
            err.usr_e.html('Invalid email please try again')
        }else{
            err.usr_i.css('border-bottom',"1px solid #fff");
            err.usr_e.delay(600).fadeOut(900)
        }

        //check if empty
        if(user.password.value.length<1){
            state = false;
            err.pwd_i.css('border-bottom',"1px solid red");
            err.pwd_e.delay(300).fadeIn(900)
            err.pwd_e.html('You must provide a password')
        }else{
            err.pwd_i.css('border-bottom',"1px solid #fff");
            err.pwd_e.delay(600).fadeOut(900)
        }
        return state
        
    }

    public validateLogin = ()=>{
        $('#gen').fadeIn(600).html('invalid username/passowrd')

        
    }

    public login = (cb)=>{
         storage.get('users',cb);
    }

    public setProfile = (data)=>{
        storage.set('current_user',data,function(err){
            console.log(err)
        })
    }

    private isEmail = function (email): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
}

export default validate;