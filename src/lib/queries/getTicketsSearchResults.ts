import { db } from "@/db";
import { tickets, customers } from "@/db/schemas";
import { eq, ilike, or, sql, asc } from "drizzle-orm";

export async function getTicketsSearchResults(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.Phone, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`,
      ))
      .orderBy(asc(tickets.createdAt))

  return results;
}

export type TicketSearchResultsType = Awaited<ReturnType<typeof getTicketsSearchResults>>
