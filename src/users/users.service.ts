import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.dbConn.insert(schema.users).values(createUserInput);
  }

  findAll() {
    return this.dbConn.query.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
