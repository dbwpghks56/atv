import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from '../schema/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.dbConn.insert(users).values(createUserInput).returning({
      email: users.email,
    });
  }

  findAll() {
    return this.dbConn.query.users.findMany();
  }

  findOne(id: number) {
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
