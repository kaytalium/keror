
    var EventEmitter = require('events').EventEmitter,
        spawn = require('child_process').spawn,
        rl = require('readline');

    var RE_SUCCESS = /bytes from/i,
        INTERVAL = 2, // in seconds
        IP = '8.8.8.8';

    

    var proc = spawn('ping', ['-v', '-n', '-i', INTERVAL, IP]),
        rli = rl.createInterface(proc.stdout, proc.stdin),
        network = new EventEmitter();

        network.online = false
    
    rli.on('line', function(str) {
        
        if (RE_SUCCESS.test(str)) {
            network.online = true;
            network.emit('online');
            
        } else if (network.online) {
            network.online = false;
            network.emit('offline');
        }
    })
    

    export let status = (div: any)=>{
        let s = network.online ? 'online':'offline';
        div.html(s)
        network.on('online', function(){
            div.html('online')
        }).on('offline', function(){
            div.html('offline')
        })
    } 
    




