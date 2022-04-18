import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() loginCredentialsDTO: LoginCredentialsDTO,): Promise<{ accessToken: string }> 
    {
      return this.authService.login(loginCredentialsDTO);
    }
}
