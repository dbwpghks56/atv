import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports:[DrizzleModule],
  exports: [UsersService]
})
export class UsersModule {}
