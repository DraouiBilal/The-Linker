import { Body, Controller, Put, Get, Req, UseGuards  } from '@nestjs/common';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UpdateProfileDto } from './dto/update-profile-dto.dto';
import { AuthGuard } from '@nestjs/passport';
import * as Neode from 'neode'
import { GetUser } from 'src/auth/get-user.decorator';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Put()
    @UseGuards(AuthGuard())
    async updateProfile(@GetUser() userNode:Neode.Node<UserInterface>, @Body() updateProfileDto: UpdateProfileDto) : Promise<{user:UserInterface}> {
        return this.profileService.updateProfile(userNode,updateProfileDto)
    }

    @Get()
    @UseGuards(AuthGuard())
    async getProfile(@GetUser() userNode:Neode.Node<UserInterface>) {
        const user: UserInterface = await userNode.toJson();
        return this.profileService.getProfile(user);
    }
}
