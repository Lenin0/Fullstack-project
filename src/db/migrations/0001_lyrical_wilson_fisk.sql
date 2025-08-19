CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"tech" varchar DEFAULT 'unassigned' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "customer_id" TO "phone";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "tech" TO "address1";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "first_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "last_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "email" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "address2" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "city" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "state" varchar(2) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "zip" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "completed";--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_phone_unique" UNIQUE("phone");