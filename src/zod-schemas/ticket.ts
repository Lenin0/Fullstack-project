import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schemas";
import { z } from "zod"

export const insertTicketSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal("(new")]),
    title: (s) => s.min(1, "Title is required"),
    description: (s) => s.min(1, "Description is required"),
    tech: (s) => s.email( "Invalid email address"),
})

export const selectTicketSchema = createSelectSchema(tickets)

export type insertTicketSchemaType = typeof insertTicketSchema

export type selectTicketSchemaType = typeof selectTicketSchema