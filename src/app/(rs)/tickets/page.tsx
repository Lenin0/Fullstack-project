import TicketsSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketsSearchResults } from "@/lib/queries/getTicketsSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";
import * as Sentry from "@sentry/nextjs"

export const metadata = {
  title: "Tickets Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { search } = await searchParams;

  if (!search) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketsSearch />
        {results.length ? <TicketTable data={results} /> : null}
      </>
    );
  }

  // query search results
  const span = Sentry.startInactiveSpan({
    name: 'getTicketsSearchResults-v1',
  })
  const results = await getTicketsSearchResults(search);
  span.end()

  // return search results
  return (
    <>
        <TicketsSearch />
        {results.length ? <TicketTable data={results} /> : <p className="mt-4">No results found</p>}
    </>
  );
}
