import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NeodeModule } from 'neode-nestjs';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      database: process.env.MONGODB_DATABASE, 
      autoLoadEntities: true,
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"]
    }),
    NeodeModule.forRoot(),
    AuthModule,
    ProfileModule,
    UsersModule,
    ChatModule
  ]
})
export class AppModule {}
