import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import * as Neode from "neode";
import { UserInterface } from "./interfaces/user.interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('Connection') private readonly neode: Neode){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
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