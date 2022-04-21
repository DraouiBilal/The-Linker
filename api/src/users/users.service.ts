import { Inject, Injectable } from '@nestjs/common';
import UserSchema from 'src/auth/dto/user.model';
import * as Neode from 'neode'

@Injectable()
export class UsersService {
    constructor(
        @Inject('Connection') private readonly neode: Neode
    ){
        neode.with({User:UserSchema})
    }
}
