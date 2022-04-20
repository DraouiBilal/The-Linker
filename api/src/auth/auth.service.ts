import { ConflictException, Inject, Injectable, InternalServerErrorException,BadRequestException } from '@nestjs/common';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import * as Neode from 'neode';
import * as bcrypt from 'bcrypt';
import {Neo4jError} from 'neo4j-driver'
import {v4 as uuid} from 'uuid'
import UserSchema from './dto/user.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserInterface } from './interfaces/user.interfaces';



@Injectable()
export class AuthService {

    constructor(
        @Inject('Connection') private readonly neode: Neode
        ,private jwtService: JwtService
    ){
        neode.with({User:UserSchema})
    }

    async signup(signupCredentialsDto: SignupCredentialsDto): Promise<{ accessToken: string }>  {
        const {firstname, lastname, username, password, email} = signupCredentialsDto
        
        const id = uuid()
        const isFirstAuth = true
        let hashedPassword : string
        
        try{
            const salt = await bcrypt.genSalt()
            hashedPassword = await bcrypt.hash(password, salt)
        }catch{
            throw new InternalServerErrorException('Server Error')
        }
        
        try {
            await this.neode.merge('User', { firstname,lastname,username,email,password: hashedPassword, id, isFirstAuth });
            const payload: JwtPayload = { id };
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken };
        } catch (err: unknown) {            
            if(err instanceof Neo4jError){
                if((err as Neo4jError).code === 'Neo.ClientError.Schema.ConstraintValidationFailed'){
                    let user:Neode.Node<UserInterface> = await this.neode.first('User','username',username)
                    if( user )
                        throw new ConflictException('Username already exists')
                        
                    user = await this.neode.first('User','email',email)
                    if(user)    
                        throw new ConflictException('Email already exists')
                }
            }
            throw new InternalServerErrorException('Server Error')
        }
        
    }
}
