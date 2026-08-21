import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DiaryModule } from './modules/diary/diary.module';
import { MoodModule } from './modules/mood/mood.module';
import { PensieveModule } from './modules/pensieve/pensieve.module';
import { ExportModule } from './modules/export/export.module';
import { HealthController } from './modules/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('DATABASE_URL') ||
          'mongodb://127.0.0.1:27017/harry_potter_diary',
      }),
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    AuthModule,
    UsersModule,
    DiaryModule,
    MoodModule,
    PensieveModule,
    ExportModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
