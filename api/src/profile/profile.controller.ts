import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Neode from 'neode'
import { GetUser } from 'src/auth/get-user.decorator';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Get()
    @UseGuards(AuthGuard())
    async getProfile(@GetUser() userNode:Neode.Node<UserInterface>) {
        const user: UserInterface = await userNode.toJson();
        return this.profileService.getProfile(user);
    }
}
