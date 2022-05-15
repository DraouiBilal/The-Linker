import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { UserInterface } from "src/auth/interfaces/user.interfaces";
import * as Neode from 'neode'
import UserSchema from "src/auth/dto/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'WebSocketStrategy') {
    constructor(@Inject('Connection') private readonly neode: Neode){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
        });
        neode.with({User:UserSchema})
    }
    
    async validate(payload: JwtPayload){
        const { id } = payload
        
        const user:Neode.Node<UserInterface> = await this.neode.find('User',id);
        if ( !user ){
            throw new UnauthorizedException();
        }
        return user;
    }
}