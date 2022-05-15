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
      url:process.env.MONGODB_URL,
      autoLoadEntities: true,
      synchronize: true,
      useUnifiedTopology: true,
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
