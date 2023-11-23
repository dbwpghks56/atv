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

  @Query(() => User, {name: 'toMe'})
  @UseGuards(JwtAuthGuard)
  toMe(
    @JwtUser() user:User
  ){
    console.log(user);
    
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
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
