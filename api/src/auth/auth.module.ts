import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NeodeModule } from 'neode-nestjs/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import UserSchema from './dto/user.model';

@Module({
    imports:[
        PassportModule.register({defaultStrategy : "jwt" }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:{
                expiresIn: 3600 * 24 * 7 // 7 days 
            }
        }),
        NeodeModule.forFeature({User: UserSchema}),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
