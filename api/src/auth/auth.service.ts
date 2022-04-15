import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import * as Neode from 'neode';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interfaces/user.interfaces';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject('Connection') private readonly neode: Neode,
    ) {}
    async login(loginCredentialsDTO:LoginCredentialsDTO){
        const { email, password } = loginCredentialsDTO
        const userInstance = await this.neode.first('User','email',email);
        if ( !userInstance ){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const user = userInstance as unknown as UserInterface;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if ( !isPasswordValid ){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const payload: JwtPayload = { "id": user.id };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
    }
}
