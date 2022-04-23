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

        try {
            friendList = await this.getAllFriends(userNode)
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }
        
        const other = friendList.find(friend=>friend.id===id)
        if(other) 
            throw new BadRequestException('User is already a friend')

        try {
            otherUser = await this.neode.first('User','id',id)
        } catch (err: unknown) {
            console.error(err)
            throw new InternalServerErrorException('Server Error')
        }

        if(!otherUser)
            throw new NotFoundException("User not found")

        try{
            await userNode.relateTo(otherUser,'pendingRequest',{since:new Date()})
            return "Friend request sent"
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
            console.log(err)
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
}


