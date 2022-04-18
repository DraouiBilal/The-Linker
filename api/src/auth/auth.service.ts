import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import * as Neode from 'neode';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interfaces/user.interfaces';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import UserSchema from './dto/user.model';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject('Connection') 
        private readonly neode: Neode,
    ) {
        neode.with({User:UserSchema})
    }
    async login(loginCredentialsDTO:LoginCredentialsDTO){
        const { email, password } = loginCredentialsDTO
        const userInstance:Neode.Node<UserInterface> = await this.neode.first('User','email',email);
        if ( !userInstance ){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const user = await userInstance.toJson()
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if ( !isPasswordValid ){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const payload: JwtPayload = { "id": user.id };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
    }
}
function InjectConnection() {
    throw new Error('Function not implemented.');
}

