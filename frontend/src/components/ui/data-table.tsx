import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Search, Upload } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: {
    key: string;
    label: string;
    options: { label: string; value: string }[];
  }[];
  showExport?: boolean;
  showMetadata?: boolean;
  showPagination?: boolean;
  onExport?: () => void;
  showSearch?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = 'Search...',
  searchKey = 'name',
  filters = [],
  showExport = false,
  showMetadata = true,
  showPagination = true,
  onExport,
  showSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative max-w-xs flex-1">
            <Search
              className="text-quarternary absolute top-1/2 left-3 -translate-y-1/2"
              size={16}
            />
            <Input
              placeholder={searchPlaceholder}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="h-9 pl-9"
            />
          </div>
        )}

        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={
              (table.getColumn(filter.key)?.getFilterValue() as string) ?? 'all'
            }
            onValueChange={(value) =>
              table
                .getColumn(filter.key)
                ?.setFilterValue(value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="h-9 w-35">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {showExport && (
          <Button
            variant="outline"
            onClick={onExport}
            className="ml-auto h-9 gap-2 shadow-none"
          >
            <Upload size={16} />
            Export
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg border border-[#E5E5E5]">
        <Table>
          <TableHeader className="bg-[#F5F5F5]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-[#E5E5E5] hover:bg-[#F5F5F5]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[#344054] py-3 text-xs font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-[#E5E5E5]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-[#101928] py-3 text-sm font-medium"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-quarternary h-24 text-center text-sm"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {(showMetadata || showPagination) && (
        <div className="flex items-center justify-end">
          {showPagination && (
            <div
              className={`flex items-center  gap-1 rounded-full bg-[#F5F5F5] p-1 ${!showMetadata ? 'ml-auto' : ''}`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="text-quarternary hover:text-dark-black h-8 rounded-full px-4 text-sm font-medium hover:bg-white disabled:opacity-50"
              >
                Prev
              </Button>

              {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                .filter((page) => {
                  const currentPage = table.getState().pagination.pageIndex + 1;
                  return (
                    page === 1 ||
                    page === table.getPageCount() ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;
                  const isActive =
                    table.getState().pagination.pageIndex + 1 === page;
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="text-quarternary px-2 text-sm font-medium">
                          ....
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.setPageIndex(page - 1)}
                        className={`h-8 min-w-8 rounded-full text-sm font-semibold ${
                          isActive
                            ? 'text-dark-black bg-white hover:bg-white'
                            : 'text-quarternary hover:text-dark-black hover:bg-white'
                        }`}
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="text-dark-black h-8 rounded-full px-4 text-sm font-semibold hover:bg-white disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
