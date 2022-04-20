import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NeodeModule } from 'neode-nestjs';

@Module({
  imports: [NeodeModule.forRoot(),AuthModule],
})
export class AppModule {}
