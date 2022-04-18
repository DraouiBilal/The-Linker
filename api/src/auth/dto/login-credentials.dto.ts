import { IsString , IsNotEmpty , IsEmail } from 'class-validator';
import { UserInterface } from '../interfaces/user.interfaces';

export class LoginCredentialsDTO implements Partial<UserInterface> {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}