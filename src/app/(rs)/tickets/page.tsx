import TicketsSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketsSearchResults } from "@/lib/queries/getTicketsSearchResults";

export const metadata = {
  title: "Tickets Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketsSearch />
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }

  // query search results
  const results = await getTicketsSearchResults(searchText);

  // return search results
  return (
    <>
      <TicketsSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
