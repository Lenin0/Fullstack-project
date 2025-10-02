"use client";

import type { selectCustomerSchemaType } from "@/zod-schemas/customer";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  data: selectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const router = useRouter();

  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "Phone",
    "city",
    "zip",
  ];

  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const columns = columnHeadersArray.map((columnName) => {
    return columnHelper.accessor(columnName, {
      id: columnName,
      header: columnName[0].toUpperCase() + columnName.slice(1),
    });
  });

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() =>
                  router.push(`/customers/form?customerId=${row.original.id}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" flex justify-between items-center">
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            }]`}
          </p>
        </div>
        <div className="sspace-x-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
