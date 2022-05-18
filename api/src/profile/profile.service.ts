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

    async updateProfile(userNode:Neode.Node<UserInterface>, updateProfileDto: UpdateProfileDto): Promise<{user:UserInterface}>{
        let hashedPassword : string

        try{
            const salt = await bcrypt.genSalt()
            hashedPassword = updateProfileDto.password?
                await bcrypt.hash(updateProfileDto.password, salt):
                userNode.properties().password
        }catch(err: unknown){
            throw new InternalServerErrorException('Server Error')
        }

        let updatedUser:Neode.Node<UserInterface> = userNode
 
        try{
            updatedUser = await userNode.update({
                ...updateProfileDto,
                avatar: updateProfileDto.avatar || userNode.properties().avatar,
                password: hashedPassword,
                id: userNode.properties().id,
                isFirstAuth: userNode.properties().isFirstAuth
            })
            return {
		user: updatedUser.properties(),
		}
        }catch(err: unknown){
            if(err instanceof Neo4jError){
                if(err.code === 'Neo.ClientError.Schema.ConstraintValidationFailed'){
                    console.error(err);
                    
                    const user:Neode.Node<UserInterface> = await this.neode.first('User','email',updateProfileDto.email)
                    
                    if(user && user.properties().id !== updatedUser.properties().id)    
                        throw new ConflictException('Email already exists')
                }
            }
            throw new InternalServerErrorException('Server Error')
        }
   }
  
    async getProfile(user: UserInterface):Promise<{ user:UserInterface }>{
        return { user }
    }
}
