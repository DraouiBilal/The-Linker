import { Inject, Injectable } from '@nestjs/common';
import UserSchema from 'src/auth/dto/user.model';
import * as Neode from 'neode'
import { UserInterface } from 'src/auth/interfaces/user.interfaces';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('Connection') private readonly neode: Neode
    ){
        neode.with({User:UserSchema})
    }

    async getProfile(user: UserInterface):Promise<{ user:UserInterface }>{
        
        return { user }
    }

    async test(){
        
    }

}
