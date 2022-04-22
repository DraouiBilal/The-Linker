import { Inject, Injectable } from '@nestjs/common';
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

    async getAllUsers(user: Neode.Node<UserInterface>):Promise<UserInterface[]>{
        const query = "MATCH (n:User) WHERE NOT (n)--() AND n.id <> $id  RETURN n";
        const params = {
            id : user.properties().id
        }
        const builder = await this.neode.cypher(query,params);

        const unknownPeopleForcurrentUser = builder.records.map((e) => {
            return (e.toObject().n);
        })
        const unknownUsers:UserInterface[] = [];
        unknownPeopleForcurrentUser.map(e=>{
            unknownUsers.push(e.properties as UserInterface)
        })
        return unknownUsers;
    }

}
