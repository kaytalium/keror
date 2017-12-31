import { settings } from "cluster";

export interface User {
    username: any,
    password: any
}

export interface ActiveUser {
    image: String,
    fullname: String,
    firstname: String,
    lastname: String,
    status?: String,
    icon?: String,
    username: String,
    isSwitching?: boolean,
    background_theme: boolean,
    background_url: String

}

export interface TimeState {
    mid: String,
    hrs: number,
    min: string | number,
    sec: string | number,
    fullTime: string
}

export interface FooterSettings{
    version: Vision
    copyright: {info: string, parent:string}
    settings:{icon:string, notice_el: string, parent: string}
    online: {icon:string, parent: string}
    time: {clock:string, date: string}
}

interface Vision{
    number:'',
    icon:'',
    parent: string
}

export interface LoginUI{
    app_name: string
    trademark: string
    element: string
    defaultBackground: Object
}

export interface AppTheme{
    default: DefaultTheme
    dark: DefaultTheme
    

}

interface DefaultTheme{
    backgroundTheme: BackgroundTheme,
    info: InfoOnBackgroundTheme
}

interface BackgroundTheme{
    'background-color': string
    'background-image': string
    'background-size': string
}
    
  interface InfoOnBackgroundTheme{
    image: string
    url: string
    imageUrl: string
    file: string
  }
    