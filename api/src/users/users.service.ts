import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        let userRequests
        try{
            userRequests = await this.getAllPendingInvitaions(userNode);
            
        }catch(err: unknown){
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        const user = userRequests.find(request => request.id === id)
        if(!user)   
            throw new NotFoundException("Invitation Not Found")

        try {
            otherUser = await this.neode.first('User','id',id)
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        if(!otherUser)
            throw new NotFoundException("User not found")
        try{
            const query = "MATCH (n:User {id:$nid})-[r:WANNA_BE_FRIEND_WITH]-(m:User {id:$mid}) delete r";
            const params = {
                nid :id,
                mid: userNode.properties().id
            }
            await this.neode.writeCypher(query,params);
            userNode.relateTo(otherUser,'friendOf')
            return "Friend Added"
        }catch(err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        
    }

    async sendFriendRequest(userNode:Neode.Node<UserInterface>, id:string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>
        let friendList: UserInterface[] 
        let requestsMade: UserInterface[]
        let requestsReceived: UserInterface[]
        
        try {
            otherUser = await this.neode.first('User','id',id)
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }

        if(!otherUser)
            throw new NotFoundException("User not found")

        
        try {
            friendList = await this.getAllFriends(userNode)
            requestsMade = await this.getAllPendingRequests(userNode)
            requestsReceived = await this.getAllPendingInvitaions(userNode)
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        
        let other = friendList.find(friend=>friend.id===id)
        if(other) 
            throw new BadRequestException('User is already a friend')

        other = requestsMade.find(request=>request.id===id)
        if(other) 
            throw new BadRequestException('You already sent a request to this user')

        other = requestsReceived.find(request=>request.id===id)
        if(other) 
            throw new BadRequestException('This user already sent you a request')
        
        try{
            await userNode.relateTo(otherUser,'pendingRequest',{since:new Date()})
            return "Friend request sent"
        }catch(err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        
    }

    async getUserFromUsername(username: string): Promise<Neode.Node<UserInterface>>{
        try {
            const user:Neode.Node<UserInterface> = await this.neode.first('User','username',username)  
            return user
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
    }

    async removeRequest(userNode:Neode.Node<UserInterface>, id:string):Promise<void>{
        let otherUser: Neode.Node<UserInterface>
        
        try {
            otherUser = await this.neode.first('User','id',id) 
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }

        if(!otherUser)
            throw new NotFoundException("User not found")

        try{
            const query = "MATCH (n:User {id:$nid})-[r:WANNA_BE_FRIEND_WITH]-(m:User {id:$mid}) delete r";
            const params = {
                nid :id,
                mid: userNode.properties().id
            }
            await this.neode.writeCypher(query,params);
        }catch(err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
    }

    async removeFriend(userNode: Neode.Node<UserInterface>, id: string): Promise<string> {
        let otherUser: Neode.Node<UserInterface>
        
        try {
            otherUser = await this.neode.first('User','id',id) 
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }

        if(!otherUser)
            throw new NotFoundException("User not found")

        try{
            const query = "MATCH (n:User {id:$nid})-[r:FRIEND_OF]-(m:User {id:$mid}) delete r";
            const params = {
                nid :id,
                mid: userNode.properties().id
            }
            await this.neode.writeCypher(query,params);
            return "Friend Removed"
        }catch(err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
    }
        
    /**
     * this method return all the users that are not friends of the current user
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
     * this method will return the requests made by the current user
     * that the people concerned did not accept or refuse the request yet
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