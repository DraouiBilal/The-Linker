import * as Neode from 'neode' 

export interface UserInterface {
    id: string;
    lastname:string;
    firstname:string;
    username:string;
    email:string;
    password:string;
    avatar:string;
    isFirstAuth:boolean;
    friendOf?: any[]
    pendingRequest?: any[]
}