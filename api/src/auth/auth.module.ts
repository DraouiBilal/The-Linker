import { Module } from '@nestjs/common';
import { NeodeModule } from 'neode-nestjs/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import UserSchema from './dto/user.model';

@Module({
    imports:[NeodeModule.forFeature({User: UserSchema})],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
