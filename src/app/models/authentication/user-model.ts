export interface User {
    username?:string;
    password?:string;
    fullName: string;
    aboutMe: string;
    gender: string;
    birthDate: Date;
    picture: string;
    address: string;
    email?:string;
    phoneNumber?: string;
    roles?:string[];
    token?:string;
}