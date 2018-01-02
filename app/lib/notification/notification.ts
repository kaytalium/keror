import * as AppInterfaces from './../interface'


export module notifier{

    export let unread = [];
    export let unreadCount = '0';
    


    export function checker(): Boolean{
        unread = MESSAGES.filter((obj: AppInterfaces.NotificationMessage)=>{
            return obj.read == false 
        })
        unreadCount = unread.length.toString();
        if(unread.length > 0)
            return true;
        else    
            return false
    }

    /**
     * 
     */
    export function updater(msg: AppInterfaces.NotificationMessage){
        let index = MESSAGES.findIndex(obj => obj.id == msg.id)
        MESSAGES[index] = msg;
        
        
    }
}


/**
 * Stimulating the notification messages
 */

 const MESSAGES: Array<AppInterfaces.NotificationMessage> = [
     {
         id: "0001",
         imageUrl: "./assests/img/system/settings.png",
         title: "New Updates Available",
         info: "Version 1.0.1 comes with security updates and more",
         read: false,
         status: 'New',
         category: "systems"
     },
     {
         id: "0002",
         imageUrl: "./assests/img/system/alarm.jpg",
         title: "Reminder - John Brown",
         info: "Call back John Brown to find out if payment was made to the account as promise",
         read: false,
         status: "New",
         category: "reminder"
     },
     {
         id: "0003",
        imageUrl: "./assests/img/system/alarm.jpg",
        title: "Reminder - general staff meeting",
        info: "to write speech for CEO before 3:00pm today ",
        read: false,
        status: "New",
        category: "reminder"
    },
    {
        id: "0004",
        imageUrl: "./assests/img/system/logo.png",
        title: "General staff meeting",
        info: "Meeating schedule for January 25, 2019 ",
        read: false,
        status: "New",
        category: "general"
    },
    {
        id: "0005",
        imageUrl: "./assests/img/system/alarm.jpg",
        title: "reminder - Mary Sue",
        info: "Will be stopping by today to check out office computer ",
        read: false,
        status: "New",
        category: "reminder"
    },
    {
        id: "0006",
        imageUrl: "./assests/img/system/logo.png",
        title: "Gate Security Meeting",
        info: "Meeting of the gate security schedule for tonight @ 8:00 PM",
        read: false,
        status: "New",
        category: "general"
    }

]