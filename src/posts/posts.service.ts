import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';
import {posts} from '../schema/schema';
import { CreatePostInput } from './dto/create-post.input';
import { queryColumns } from 'src/config/util/query-columns.util';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @Inject(PG_CONNECTION) private readonly dbConn: NodePgDatabase<typeof schema>
    ) {}

    async createPost(
        user: User,
        createPostInput: CreatePostInput
    ) {
        createPostInput.user_id = user.user_id;
        const post = await this.dbConn.insert(posts).values(createPostInput)
            .returning()

        return post[0];
    }

    async findAllPosts(
        requestInfo: string[], page: number, pageSize?: number
    ) {
        const post = await this.dbConn.query.posts.findMany({
            columns: queryColumns(requestInfo),
            with: {
                author: true,
            },
            limit: pageSize ?? 10,
            offset: page * (pageSize ?? 10) 
        });
        
        
        return post;
    }
}
