export interface UserInterface {
    id: string;
    lastname:string;
    firstname:string;
    username:string;
    email:string;
    password:string;
    avatar?:string;
    isFirstAuth:boolean;
}