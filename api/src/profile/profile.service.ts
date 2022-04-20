import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Neode from 'neode'
import * as bcrypt from 'bcrypt';
import UserSchema from 'src/auth/dto/user.model';
import { UserInterface } from 'src/auth/interfaces/user.interfaces';
import { UpdateProfileDto } from './dto/update-profile-dto.dto';
import {Neo4jError} from 'neo4j-driver'

@Injectable()
export class ProfileService {

    constructor(
        @Inject('Connection') private readonly neode: Neode
    ){
        neode.with({User:UserSchema})
    }

    async updateProfile(updateProfileDto: UpdateProfileDto): Promise<UserInterface>{
        const user:Neode.Node<UserInterface> = await this.neode.first('User','username',updateProfileDto.username)
        let hashedPassword : string

        try{
            const salt = await bcrypt.genSalt()
            hashedPassword = await bcrypt.hash(updateProfileDto.password, salt)
        }catch{
            throw new InternalServerErrorException('Server Error')
        }

        let updatedUser:Neode.Node<UserInterface>

        try{
            updatedUser = await user.update({
                ...updateProfileDto,
                password: hashedPassword,
                id: user.properties().id,
                isFirstAuth: user.properties().isFirstAuth
            })
            return updatedUser.properties()
        }catch(err: unknown){
            if(err instanceof Neo4jError){
                if((err as Neo4jError).code === 'Neo.ClientError.Schema.ConstraintValidationFailed'){
                        
                    const user:Neode.Node<UserInterface> = await this.neode.first('User','email',updateProfileDto.email)
                    
                    if(user && !updatedUser)    
                        throw new ConflictException('Email already exists')
                }
            }
            throw new InternalServerErrorException('Server Error')
        }
   }
}
