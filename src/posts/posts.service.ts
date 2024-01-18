import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import * as schema from '../schema/schema';
import {posts} from '../schema/schema';
import { CreatePostInput } from './dto/create-post.input';
import { queryColumns } from 'src/config/util/query-columns.util';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { eq } from 'drizzle-orm';

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
    ){
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

    async findPost (
        post_id: number,
        requestInfo: string[]
    ) {
        const post = await this.dbConn.query.posts.findFirst({
            columns: queryColumns(requestInfo),
            with: {
                author: {
                    columns: {
                        password: false
                    }
                }
            },
            where: eq(posts.post_id, post_id)
        });

        if(!post) {
            throw new NotFoundException("존재하지 않는 post 입니다. {" + post_id + "}");
        }

        return post;
    }

    async findPostByUser(
        requestInfo: string[],
        user_id: number
    ):Promise<{}> {
        const post = await this.dbConn.query.posts.findMany({
            columns: queryColumns(requestInfo),
            where: eq(posts.user_id, user_id)
        });

        
        if(!post) {
            throw new NotFoundException("해당 유저가 작성한 글이 없습니다.");
        }

        return post;
    }
}
