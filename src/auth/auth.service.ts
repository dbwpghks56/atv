import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginJwt } from './entities/login-jwt.entity';
import { LogInUserInput } from './dto/signIn-user.input';
import { PG_CONNECTION } from 'src/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema/schema';
import { users } from '../schema/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(PG_CONNECTION) private dbConn: NodePgDatabase<typeof schema>,
        private jwtService: JwtService
    ) {}

    async login(loginInput: LogInUserInput) : Promise<LoginJwt> {
        const user = await this.dbConn.query.users.findFirst({
            where: eq(users.email, loginInput.email)
        });

        const isPasswordValid = await bcrypt.compare(loginInput.password, user.password);

        if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');
        
        const payload = { sub: user.user_id, username: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
