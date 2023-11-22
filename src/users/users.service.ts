import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from '../schema/schema';
import * as bcrypt from 'bcrypt';
import { SignInUserInput } from './dto/signIn-user.input';
import { Gender } from './enums/user.enum';
import { queryColumns } from 'src/config/util/query-columns.util';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
  ) {}

  async signUp(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      roundsOfHashing
    );

    createUserInput.password = hashedPassword;
    
    const user = await this.dbConn.transaction(async (tx) => {
      const gender = Gender[createUserInput.gender];

      return await tx.insert(users).values({
        email: createUserInput.email,
        password: createUserInput.password,
        nickname: createUserInput.nickname,
        birth: createUserInput.birth,
        gender: gender
      }).returning({
        user_id: users.user_id,
        email: users.email,
        nickname: users.nickname,
        birth: users.birth,
        gender: users.gender,
        status: users.status,
        createdTime: users.createdTime,
        updatedTime: users.updatedTime
      }).catch((e) => {
        tx.rollback();
      });
    });
    
    return user[0];
  }

  async signIn(signInUserInput: SignInUserInput) {
    const user = await this.dbConn.query.users.findFirst({
      where: eq(users.email, signInUserInput.email)
    });

    const isPasswordValid = await bcrypt.compare(signInUserInput.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');

    return user;
  }

  findAll(requestInfo: string[]) {
    console.log(requestInfo);
    
    return this.dbConn.query.users.findMany({
      columns: queryColumns(requestInfo)
    });
  }

  findOne(id: number) {
    const user = this.dbConn.query.users.findFirst({
      where: eq(users.user_id, id)
    });

    return this.dbConn.query.users.findFirst({
      where: eq(users.user_id, id)
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    

    return this.dbConn.update(users).set({
      email: updateUserInput.email,
      password: updateUserInput.password
    }).where(eq(users.user_id, id)).returning();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
