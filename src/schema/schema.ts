import { pgTable, serial, text } from "drizzle-orm/pg-core";


export const users = pgTable('user', {
    user_id: serial('user_id').primaryKey(),
    email: text('email'),
    password: text('password')
});