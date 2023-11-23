import { Inject, Injectable } from '@nestjs/common';
import { MIGRATE, PG_CONNECTION } from './constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

@Injectable()
export class AppService {
  constructor(
    @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
  ) {
    migrate(dbConn, {migrationsFolder: 'src/migrate'})
  }

  getHello(): string {
    return 'Hello World!';
  }
}
