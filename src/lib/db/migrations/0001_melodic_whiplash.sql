CREATE TABLE IF NOT EXISTS "room" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ownerId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_rooms" (
	"user_id" text NOT NULL,
	"room_id" text NOT NULL,
	CONSTRAINT "users_to_rooms_user_id_room_id_pk" PRIMARY KEY("user_id","room_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
