import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
;

export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    email: varchar("email").unique().notNull(),
    Phone: varchar("phone").unique().notNull(),
    adress1: varchar("address1").notNull(),
    adress2: varchar("address2").notNull(),
    city: varchar("city").notNull(),
    state: varchar("state", { length: 2}).notNull(),
    zip: varchar("zip", {length: 10}).notNull(),
    notes: text("notes"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(() => customers.id),
    title: varchar("title").notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    tech: varchar("tech").notNull().default("unassigned"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

// Create Relations
export const customersRelations = relations(customers, ({many}) => ({
    tickets:many(tickets),
}))

export const ticketsRelations = relations(tickets, ({one}) => ({
    customers: one(customers, {
        fields: [tickets.customerId],
        references: [customers.id]
    })
}))