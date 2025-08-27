import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomersSearchResult";

export const metadata = {
    title: "Customers Search"
}

export default async function Costumers({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) {
    
    const { searchText } = await searchParams

    if(!searchText) return <CustomerSearch />

    // query database
    const results = await getCustomerSearchResults(searchText)
    
    // returm results
    return (
        <>
        <CustomerSearch />
        <p>{JSON.stringify(results)}</p>
        </>
    )
}