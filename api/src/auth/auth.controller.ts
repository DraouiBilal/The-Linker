import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    async signup(@Body() signupCredentialsDto: SignupCredentialsDto) : Promise<{ accessToken: string }>{
        return await this.authService.signup(signupCredentialsDto)
    }
}
