import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NeodeModule } from 'neode-nestjs/dist';
import UserSchema from 'src/auth/dto/user.model';

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
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
