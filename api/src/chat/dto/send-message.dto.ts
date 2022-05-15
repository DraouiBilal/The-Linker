import {IsNotEmpty,IsString, IsUUID, IsNumber} from 'class-validator'

export class SendMessageDto{
    
    @IsNotEmpty()
    @IsUUID()
    to: string

    @IsNotEmpty()
    @IsString()
    message:string

    @IsNotEmpty()
    @IsNumber()
    id: number
}   

