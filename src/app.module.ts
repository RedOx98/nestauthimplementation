import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    }
  ]
})
export class AppModule {}
