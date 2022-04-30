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

    /**
     * this method return all the users that are nor friends of the currents user
     * nor the ones that they send him a friend request nor the ones that he/she
     * sent the request to
     * @param user 
     * @returns
     */
    async getAllUsers(user: Neode.Node<UserInterface>):Promise<UserInterface[]>{
        const query = "MATCH (user:User {id:$id}) MATCH (others:User) WHERE others.id<>user.id AND NOT (others)--(user) RETURN others";
        const params = {
            id : user.properties().id
        }
        const builder = await this.neode.cypher(query,params);

        const unknownPeopleForcurrentUser = builder.records.map((e) => {
            return (e.toObject().others);
        })
        const unknownUsers:UserInterface[] = [];
        unknownPeopleForcurrentUser.map(e=>{
            unknownUsers.push(e.properties as UserInterface)
        })
        return unknownUsers;
    }


    /**
     * this method will return all the friends of the current user
     * (a friend is defined by the relation [:FRIEND_OF])
     * @param user 
     * @returns 
     */
    async getAllFriends(user: Neode.Node<UserInterface>):Promise<UserInterface[]>{ 
        const query = "MATCH (n:User {id:$id}) MATCH (n)-[:FRIEND_OF]-(m) RETURN m";
        const params = {
            id : user.properties().id
        }
        const builder = await this.neode.cypher(query,params);

        const friensOfUsers = builder.records.map((e) => {
            return (e.toObject().m);
        })
        const friends:UserInterface[] = [];
        friensOfUsers.map(e=>{
            const currentuser = e.properties as UserInterface
            friends.push(currentuser)
        })
        return friends;
    }


    /**
     * this method will return the request made by the current user
     * that the persons concerned did not accept or refuse the request yet
     * @param user 
     * @returns 
     */
     async getAllPendingRequests(user: Neode.Node<UserInterface>):Promise<UserInterface[]>{ 
        const query = "MATCH (n:User {id:$id}) MATCH (n)-[:WANNA_BE_FRIEND_WITH]->(m) RETURN m";
        const params = {
            id : user.properties().id
        }
        const builder = await this.neode.cypher(query,params);

        const pendingRequestOfUser = builder.records.map((e) => {
            return (e.toObject().m);
        })
        const pendingRequests:UserInterface[] = [];
        pendingRequestOfUser.map(e=>{
            const currentuser = e.properties as UserInterface
            pendingRequests.push(currentuser)
        })
        return pendingRequests;
    }

    /**
     * this method will return all users that sent a friend request
     * to the current user
     * @param user 
     * @returns 
     */
    async getAllPendingInvitaions(user: Neode.Node<UserInterface>):Promise<UserInterface[]>{ 
        const query = "MATCH (n:User {id:$id}) MATCH (n)<-[:WANNA_BE_FRIEND_WITH]-(m) RETURN m";
        const params = {
            id : user.properties().id
        }
        const builder = await this.neode.cypher(query,params);

        const pendingInvitationstOfUser = builder.records.map((e) => {
            return (e.toObject().m);
        })
        const pendingInvitaions:UserInterface[] = [];
        pendingInvitationstOfUser.map(e=>{
            const currentuser = e.properties as UserInterface
            pendingInvitaions.push(currentuser)
        })
        return pendingInvitaions;
    }
}
