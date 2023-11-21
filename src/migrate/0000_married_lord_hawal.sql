CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
