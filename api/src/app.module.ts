import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NeodeModule } from 'neode-nestjs';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [NeodeModule.forRoot(),AuthModule, ProfileModule],
})
export class AppModule {}
