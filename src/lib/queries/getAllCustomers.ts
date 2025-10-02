import { db } from "@/db";
import { customers } from "@/db/schemas";

export async function getAllCustomers() {
  const customer = await db.select().from(customers);
  return customer;
}
