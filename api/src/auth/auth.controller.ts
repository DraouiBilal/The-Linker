import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    async signup(@Body() signupCredentialsDto: SignupCredentialsDto) : Promise<{ accessToken: string }>{
        return await this.authService.signup(signupCredentialsDto)
    }
  
    @Post('/login')
    async login(@Body() loginCredentialsDTO: LoginCredentialsDTO,): Promise<{ accessToken: string }> 
    {
      return this.authService.login(loginCredentialsDTO);
    }

}
