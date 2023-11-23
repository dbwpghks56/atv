CREATE TABLE IF NOT EXISTS "tb_post" (
	"post_id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"content" text,
	"user_id" integer,
	"status" boolean DEFAULT true,
	"createdTime" date DEFAULT now(),
	"updatedTime" date DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_post" ADD CONSTRAINT "tb_post_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
