import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, date, pgEnum, smallint, boolean } from "drizzle-orm/pg-core";

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