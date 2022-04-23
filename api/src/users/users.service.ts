import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import UserSchema from 'src/auth/dto/user.model';
import * as Neode from 'neode'
import { UserInterface } from 'src/auth/interfaces/user.interfaces';

@Injectable()
export class UsersService {
    
    constructor(
        @Inject('Connection') private readonly neode: Neode
    ){
        neode.with({User:UserSchema})
    }

    async acceptFriendRequest(userNode:Neode.Node<UserInterface>, id:string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>

        try {
            otherUser = await this.neode.first('User','id',id)
            
        } catch (err: unknown) {
            throw new InternalServerErrorException('Server Error')
        }
        try{
            const user = await userNode.toJson()
            if(user.sentFriendRequestTo)
                console.log(user.sentFriendRequestTo)
            await userNode.relateTo(otherUser,'friendOf',{since:"db"})
            return "Friend Added"
        }catch(err: unknown) {
            throw new InternalServerErrorException('Server Error')
        }
        
    }

    async sendFriendRequest(userNode:Neode.Node<UserInterface>, id:string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>
        
        try {
            otherUser = await this.neode.first('User','id',id)
            
        } catch (err: unknown) {
            console.log(err)
            throw new InternalServerErrorException('Server Error')
        }
        try{
            await userNode.relateTo(otherUser,'sentFriendRequestTo',{since:new Date()})
            return "Friend request sent"
        }catch(err: unknown) {
            console.log(err)
            throw new InternalServerErrorException('Server Error')
        }
        
    }

    async removeFriend(userNode: Neode.Node<UserInterface>, id: string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>
        
        try {
            otherUser = await this.neode.first('User','id',id)
            
        } catch (err: unknown) {
            console.log(err)
            throw new InternalServerErrorException('Server Error')
        }
        try{
            // await userNode.relateTo(otherUser,'sentFriendRequestTo',{since:new Date()})
            return "Friend deleted"
        }catch(err: unknown) {
            console.log(err)
            throw new InternalServerErrorException('Server Error')
        }
    }
}


