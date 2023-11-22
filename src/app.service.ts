import { Inject, Injectable } from '@nestjs/common';
import { MIGRATE } from './constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
