import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../schema/schema';
import { MIGRATE } from 'src/constants';

@Module({
    providers: [{
        provide: MIGRATE,
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
            const db = drizzle(client, { schema });
            
            try {
                await migrate(db, { migrationsFolder: 'src/migrate/' });
            } catch(e) {
                
            } finally {
                
            }
        }
    }],
    exports: [MIGRATE]
})
export class MigrateModule { }
