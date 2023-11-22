import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ApolloDriver } from '@nestjs/apollo';
import { MigrateModule } from './migrate/migrate.module';

@Module({
  imports: [
    DrizzleModule,
    MigrateModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      context: ({req, connection}) => {
        if(req) {
          const user = req.headers.authorization;

          return {...req, user};
        } else {
          return connection;
        }
      }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
