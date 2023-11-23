import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';

@Injectable()
export class PostsService {
    constructor(
        @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
    ) {}
}
