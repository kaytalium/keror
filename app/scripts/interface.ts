export interface User{
    username:any,
    password:any
}

export interface ActiveUser {
    image: String,
    fullname: String,
    firstname: String,
    lastname: String,
    status?: String,
    icon?: String,
    username: String,
    isSwitching?:boolean,
    background_theme:boolean,
    background_url:String

}

export interface TimeState{
    mid: String,
    hrs: number,
    min: string | number,
    sec: string | number,
    fullTime: string
}