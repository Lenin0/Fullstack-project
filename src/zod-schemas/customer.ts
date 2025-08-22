
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schemas";
import { z } from "zod"

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (s) => s.min(1, "First name is required"),
  lastName:  (s) => s.min(1, "Last name is required"),
  adress1:   (s) => s.min(1, "Address is required"),     
  city:      (s) => s.min(1, "City is required"),
  state:     (s) => s.length(2, "State must be 2 letters"),
  email:     (s) => s.email("Invalid email address"),
  zip:       (s) => s.regex(/^\d{5}(?:-\d{4})?$/, "Invalid ZIP"),
  Phone:     (s) => s.regex(/^\d{3}-\d{3}-\d{4}$/, "Use XXX-XXX-XXXX"),
});

export const selectCustomerSchema = createSelectSchema(customers)

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
