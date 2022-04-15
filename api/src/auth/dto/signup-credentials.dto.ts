import {IsNotEmpty, IsEmail, IsString, Length} from 'class-validator'
import { UserInterface } from '../interfaces/user.interfaces'

export class SignupCredentialsDto implements Partial<UserInterface>{
    @IsNotEmpty()
    @IsString()
    firstname: string 

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @Length(8,25)
    password: string

    @IsEmail()
    email: string
}