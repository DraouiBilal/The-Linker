import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NeodeModule } from 'neode-nestjs/dist';
import UserSchema from 'src/auth/dto/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
