import {IsNotEmpty,IsUUID} from 'class-validator'

export class GetMessagesDto{
    @IsNotEmpty()
    @IsUUID()
    to:string
}