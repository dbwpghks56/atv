DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"nickname" text,
	"birth" date,
	"gender" "gender",
	"status" boolean DEFAULT true,
	"createdTime" date DEFAULT now(),
	"updatedTime" date DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
