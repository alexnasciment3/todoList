import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/task/task.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `/src/env/.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
