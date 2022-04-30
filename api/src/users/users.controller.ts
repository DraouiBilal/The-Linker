import { Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import * as Neode from 'neode'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private userService: UsersService){}
  
    @Post('/:id')
    async sendFriendRequest(@GetUser() userNode:Neode.Node<UserInterface>,@Param('id') id:string): Promise<string>{
        return await this.userService.sendFriendRequest(userNode,id)
    }
    
    
    @Put("/:id")
    async acceptFriendRequest(@GetUser() userNode:Neode.Node<UserInterface>,@Param('id') id:string): Promise<string>{
        return await this.userService.acceptFriendRequest(userNode,id)
    }

    @Delete("/:id")
    async removeFriend(@GetUser() userNode:Neode.Node<UserInterface>,@Param('id') id:string): Promise<string>{
        return await this.userService.removeFriend(userNode,id)
    }
  
    @Get('/unknown-users')
    async getAllUsers(@GetUser() user:Neode.Node<UserInterface>){
        const unknownUsers:UserInterface[] = await this.userService.getAllUsers(user);
        return {unknownUsers}
    }

    @Get('/friends')
    async getAllFriends(@GetUser() user:Neode.Node<UserInterface>){
        const friends:UserInterface[] = await this.userService.getAllFriends(user);
        return {friends}
    }

    @Get('/pending-requests')
    async getAllPendingRequests(@GetUser() user:Neode.Node<UserInterface>){
        const pendingRequests:UserInterface[] = await this.userService.getAllPendingRequests(user);
        return {pendingRequests}
    }

    @Get('/invitations')
    async getAllPendingInvitaions(@GetUser() user:Neode.Node<UserInterface>){
        const pendingInvitaions:UserInterface[] = await this.userService.getAllPendingInvitaions(user);
        return {pendingInvitaions}
    }
}
