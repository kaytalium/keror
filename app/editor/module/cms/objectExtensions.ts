export {}

declare global{
    interface Number{
        money(): string
    }
    interface Date{
        kerorFormat(): string
    }
}

Number.prototype.money = function(){
    return '$' + parseFloat(this.valueOf()).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
}


Date.prototype.kerorFormat = function(){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let cy = new Date().getFullYear(); //current Year
    let oy = this.getFullYear(); // object value year

    if(cy !== oy){
        return months[this.getMonth()]+' '+this.getDate()+', '+this.getFullYear()
    }else{
        return  months[this.getMonth()]+' '+this.getDate()
    }
    
}