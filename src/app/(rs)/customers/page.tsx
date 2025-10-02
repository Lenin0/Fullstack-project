import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomersSearchResult";
import { getAllCustomers } from "@/lib/queries/getAllCustomers";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";
import * as Sentry from "@sentry/nextjs"

export const metadata = {
    title: "Customers Search"
}

export default async function Costumers({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) {
    
    const { searchText } = await searchParams

    if(!searchText) {
      const results = await getAllCustomers();
      return (
        <>
        <CustomerSearch />
        {results.length ? <CustomerTable data={results} /> : null}
        </>
      )
    }

    // query database
    const span = Sentry.startInactiveSpan({
      name: 'getCustomerSearchResults-v1',
    })
    const results = await getCustomerSearchResults(searchText)
    span.end()
    
    // returm results
    return (
        <>
          <CustomerSearch />
            {results.length ? <CustomerTable data={results} /> : (
                <p className="mt-4">No results found</p>
            )}
        </>
    )
}