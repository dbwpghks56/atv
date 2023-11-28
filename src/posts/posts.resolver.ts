import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { JwtUser } from 'src/config/decorators/jwt-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLInfo } from 'src/config/decorators/graphQL.decorator';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @JwtUser() user:User
  ) {
    return this.postsService.createPost(user, createPostInput);
  }

  @Query(() => [Post], {name: 'findAllPost'})
  findAllPost(
    @GraphQLInfo() requestInfo: string[],
    @Args('page', { type: () => Int }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number
  ) {
    return this.postsService.findAllPosts(requestInfo, page, pageSize);
  }

  @Query(() => Post, {name: 'findPost'})
  findPost(
    @GraphQLInfo() requestInfo: string[],
    @Args('post_id', { type: () => Int }) post_id: number
  ) {
    return this.postsService.findPost(post_id, requestInfo);
  }

  @Query(() => Post, {name: 'findPostByUser'})
  findPostByUser(
    @GraphQLInfo() requestInfo: string[],
    @Args('user_id', {type: () => Int}) user_id:number
  ) {
    return this.postsService.findPostByUser(requestInfo, user_id);
  }
}
