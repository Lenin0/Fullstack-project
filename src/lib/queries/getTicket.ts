import { db } from "@/db";
import {  tickets } from "@/db/schemas"
import { eq } from "drizzle-orm";

export async function getTicket(id: number) {
    const ticket = await db.select()
        .from(tickets)
        .where(eq(tickets.id, id))

    return ticket[0]

}

export async function getCustomerTicket(customer_id: number) {
    const ticket = await db.select()
        .from(tickets)
        .where(eq(tickets.customerId, customer_id))

    return ticket

}

