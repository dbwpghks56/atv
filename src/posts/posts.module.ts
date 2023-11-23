import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [DrizzleModule]
})
export class PostsModule {}
