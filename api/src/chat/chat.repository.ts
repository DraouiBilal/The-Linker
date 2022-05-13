import { Injectable } from "@nestjs/common";
import { UserInterface } from "src/auth/interfaces/user.interfaces";
import { EntityRepository, Repository } from "typeorm";
import { Chat } from "./chat.entity";
import {SendMessageDto} from './dto/send-message.dto'
import * as Neode from 'neode'
import { WsException } from "@nestjs/websockets";
import { UsersService } from "src/users/users.service";
import UserSchema from "src/auth/dto/user.model";
import { GetMessagesDto } from "./dto/get-messages.dto";

@Injectable()
@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat>{

    private userService: UsersService

    constructor(){
        super()
        this.userService = new UsersService(Neode.fromEnv().with({User:UserSchema}))
    }

    async createMessage(sendMessageDto: SendMessageDto, user:UserInterface): Promise<Chat> {
        
        
        const {to,message} = sendMessageDto
        let other:Neode.Node<UserInterface>
        try{
            other = await this.userService.getUserFromID(to)
            
        }catch(err: unknown){
            console.error(err);
            throw new WsException("Server Error")
        }

        if(!other)
            throw new WsException("User not found")
        const chat: Chat = this.create({
            from:user.id,
            to:other.properties().id,
            message,
            date: new Date()
        })
        await this.save(chat)
        return chat
    }

    async getMessages(userNode:Neode.Node<UserInterface>, getMessageDto:GetMessagesDto): Promise<Chat[]> {
        const {to} = getMessageDto
        const from = userNode.properties().id

        const messages = await this.manager.find(Chat,{
            where:{
                $or:[
                    {from,to},
                    {from:to,to:from}
                ]
            },
            order:{
                date:'ASC'
            }
        })
        return messages
    }

    async getFriends(userNode: Neode.Node<UserInterface>): Promise<UserInterface[]>{
        const friends = await this.userService.getAllFriends(userNode)
        return friends
    }
}