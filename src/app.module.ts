import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_FILTERS } from './middlewares/filters/global.filter';
import { AppController } from './app.controller';
import { GLOBAL_INTERCEPTORS } from './middlewares/interceptors/global.interceptor';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
  ],
  controllers: [AppController],
  providers: [Logger, ...GLOBAL_FILTERS, ...GLOBAL_INTERCEPTORS],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
