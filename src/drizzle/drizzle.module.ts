import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from '../schema/schema';
import { PG_CONNECTION } from 'src/constants';

@Module({
    providers: [{
        provide: PG_CONNECTION,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const pool = new Pool({
                host: configService.get<string>('DATABASE_HOST'),
                port: 32119,
                user: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: 'postgres'
            });

            const client = await pool.connect();

            return drizzle(client, {schema, logger: true});
        }
    }],
    exports: [PG_CONNECTION]
})
export class DrizzleModule {}
