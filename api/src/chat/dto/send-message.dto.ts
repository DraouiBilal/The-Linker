import {IsNotEmpty,IsString} from 'class-validator'

export class SendMessageDto{
    
    @IsNotEmpty()
    @IsString()
    to: string

    @IsNotEmpty()
    @IsString()
    message:string
}