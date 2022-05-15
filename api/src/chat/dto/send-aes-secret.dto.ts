import {IsNotEmpty,IsString } from 'class-validator'

export class SendAesSecretDto{
    
    @IsNotEmpty()
    @IsString()
    secret: string
}   

