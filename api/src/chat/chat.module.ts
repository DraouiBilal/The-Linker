import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeodeModule } from 'neode-nestjs/dist';
import UserSchema from 'src/auth/dto/user.model';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { JwtStrategy } from './jwt-strategy';

@Module({
    imports:[
        UsersModule,
        PassportModule.register({defaultStrategy : "jwt" }),
        TypeOrmModule.forFeature([ChatRepository]),
        NeodeModule.forFeature({User: UserSchema}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:{
                expiresIn: 3600 * 24 * 7 // 7 days 
            }
        })
    ],
    providers:[ChatGateway,JwtStrategy]
})
export class ChatModule {}
