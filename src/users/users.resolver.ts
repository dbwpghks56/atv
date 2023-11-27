import { Resolver, Query, Mutation, Args, Int, Info, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LogInUserInput } from '../auth/dto/signIn-user.input';
import { GraphQLInfo } from 'src/config/decorators/graphQL.decorator';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUser } from 'src/config/decorators/jwt-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.signUp(createUserInput);
  }

  @Query(() => User, {
    name: 'toMe',
    description: 'Header 에 Jwt Token 을 받아와 로그인한 유저가 누군지 조회'
  })
  @UseGuards(JwtAuthGuard)
  toMe(
    @JwtUser() user:User
  ){
    return user;
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @GraphQLInfo() requestInfo: string[],
    @Args('page', { type: () => Int }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true}) pageSize?: number
  ) {
    return this.usersService.findAll(requestInfo, page, pageSize);
  }
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @JwtUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
    ) {
    
    return this.usersService.update(user, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@JwtUser() user: User) {
    return this.usersService.remove(user.user_id);
  }
}
