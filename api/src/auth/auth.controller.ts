import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    async signup(@Body() signupCredentialsDto: SignupCredentialsDto) : Promise<{ accessToken: string }>{
        return await this.authService.signup(signupCredentialsDto)
    }
}
