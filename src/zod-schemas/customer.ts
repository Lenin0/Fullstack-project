
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schemas";
import { z } from "zod"

const idCoerce = z.preprocess((v) => {
  if (v === "$undefined" || v === undefined || v === null) return 0;
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (trimmed === "" || trimmed === "(New)") return 0;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : 0;
  }
  if (typeof v === "number") return v;
  return 0;
}, z.number().int().min(0));

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

export const upsertCustomerSchema = insertCustomerSchema.extend({
  id: idCoerce.default(0),
});

export const selectCustomerSchema = createSelectSchema(customers)

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
