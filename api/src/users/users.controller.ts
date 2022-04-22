import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import * as Neode from 'neode'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private userService: UsersService){}

    @Post("/:id")
    async addFriend(@GetUser() userNode:Neode.Node<UserInterface>,@Param('id') id:string): Promise<string>{
        return await this.userService.addFriend(userNode,id)
    }
}
