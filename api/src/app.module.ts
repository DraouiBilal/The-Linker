import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NeodeModule } from 'neode-nestjs';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NeodeModule.forRoot(),AuthModule, ProfileModule, UsersModule],
})
export class AppModule {}
