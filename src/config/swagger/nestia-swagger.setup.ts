/* eslint-disable @typescript-eslint/no-var-requires */
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';

export function nestiaSwaggerSetup(app: INestApplication): void {
  //   const docs = fs.readFileSync(
  //     path.join(__dirname, '../../../swagger.json'),
  //     'utf-8',
  //   );
  const docs = require(path.join(__dirname, '../../../../swagger.json'));

  SwaggerModule.setup('api-docs', app, docs);
}
