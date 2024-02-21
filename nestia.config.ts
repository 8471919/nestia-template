import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);

    return app;
  },
  swagger: {
    output: 'swagger.json',
    beautify: true,

    security: {
      authorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Authorization',
      },
      proxyAuthorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Proxy-Authorization',
      },
      xLaivApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-Laiv-API-Key',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
  json: true,
  output: 'api',
  distribute: 'packages/api',

  primitive: false,
};
export default NESTIA_CONFIG;
