import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UsersService } from './users.service';
import * as Neode from 'neode'
import { UserInterface } from 'src/auth/interfaces/user.interfaces';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private userService: UsersService){}

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
}
