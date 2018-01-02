/**
 * import interface
 */
import {LoginUI} from './interface'

/**
 * import js-yaml to handle my .yml config files  
 */
const yaml = require('js-yaml');

/**
 * Import node fs
 */
const fs = require('fs');

import validate from './validate';
import $ = require('jquery'); 


/**
 * create var for holding the data coming from the footer.yml file
 */
let loginUI: LoginUI;

try {
    loginUI = yaml.safeLoad(fs.readFileSync('./app/config/login.yml', 'utf8'));
    console.log(loginUI)
} catch (e) {
    console.log(e);
}

$(document).ready(function(){


    $('.main-h1').html(loginUI.app_name)

    $('.trademark').html(loginUI.trademark)

    $('.login_form').append(loginUI.element)

    //load the theme 
    $('body').css(Object.assign(loginUI.defaultBackground))
    //get the form 
    var form        = $("#lgon_form");
    var submit      = $("#submit");
    var signupBtn   = $("#signupBtn")
    
    
    signupBtn.click(function(e){
        e.preventDefault();
        $('.content').load("./views/authenticate/signup.html")
    })

    

    //if not display default login
        
    

    //handle the login button on the login form
    submit.click(function(e){
        e.preventDefault();
        
        //get the form data and setup object with both username and password
        var formData = form.serializeArray()
        
        var user = {
            username:formData[0],
            password:formData[1]
        }

        let profile; 

        //create validate class
        const v = new validate();
        //pass object to checker function that will clean and validate the user input
        var isCleanAndValidated = v.isCleanAndValidated(user)
        
        if(isCleanAndValidated)
        {
            //pass values to handler that will check entry against database
            v.login(function(error, data){
                if (error) throw error;
               
                //
                if(data.users){
                    
                    var users = data.users;
                    let currentUser;
                    users.forEach(element => {                
                        if(element.username == user.username.value && element.password == user.password.value){
                            currentUser = element.username;
                        }
                
                    });

                    
                    //we can now get the current user that is logging in
                    if(currentUser){
                        
                         data.profile.forEach(el => {
                            
                            if(el[currentUser]){
                                profile = el[currentUser];
                                profile.username = currentUser;
                            }
                         });
                        v.setProfile(profile)
                        //$(location).attr('href','./dashboard.html');
                    }else{
                        v.validateLogin()
                    }
                    
                }
    
              })
                
            

        }
    })
    
})