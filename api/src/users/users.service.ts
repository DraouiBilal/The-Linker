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
            .model('User')
            .relationship('friend', 'relationship', 'FRIEND', 'direction_both', 'User')
    }

    async addFriend(userNode:Neode.Node<UserInterface>, id:string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>

        try {
            otherUser = await this.neode.first('User','id',id)
        } catch (err: unknown) {
            throw new InternalServerErrorException('Server Error')
        }
        try{
            const relationship = await userNode.relateTo(otherUser,'friend')
            return relationship.toJson()
        }catch(err: unknown) {
            throw new InternalServerErrorException('Server Error')
        }
        
    }
}


