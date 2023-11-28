import { InferModel, relations } from "drizzle-orm";
import { pgTable, serial, text, date, pgEnum, smallint, boolean, integer } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum('gender', ['MALE', 'FEMALE']);

export const users = pgTable('user', {
    user_id: serial('user_id').primaryKey(),
    email: text('email').unique(),
    password: text('password'),
    profileImage: text('profile_image'),
    nickname: text('nickname'),
    birth: date('birth'),
    gender: genderEnum('gender'),
    status: boolean('status').default(true),
    createdTime: date('createdTime').defaultNow(),
    updatedTime: date('updatedTime').defaultNow()
});

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts, {relationName: 'post_author'}),
}));

export const posts = pgTable('tb_post', {
    post_id: serial('post_id').primaryKey(),
    title: text('title'),
    content: text('content'),
    user_id: integer('user_id').references(() => users.user_id),
    status: boolean('status').default(true),
    createdTime: date('createdTime').defaultNow(),
    updatedTime: date('updatedTime').defaultNow()
});

export const postRelations = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.user_id],
        references: [users.user_id],
        relationName: 'post_author'
    }),
}));