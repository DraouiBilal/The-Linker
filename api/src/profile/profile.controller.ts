import { Body, Controller, Put } from '@nestjs/common';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UpdateProfileDto } from './dto/update-profile-dto.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Put()
    async updateProfile(@Body() updateProfileDto: UpdateProfileDto) : Promise<UserInterface> {
        return this.profileService.updateProfile(updateProfileDto)
    }
}
