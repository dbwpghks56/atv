import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { PostsService } from 'src/posts/posts.service';

@Module({
  providers: [UsersResolver, UsersService, PostsService],
  imports:[DrizzleModule],
  exports: [UsersService]
})
export class UsersModule {}
