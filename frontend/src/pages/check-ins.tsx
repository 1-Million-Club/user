import CheckInActions from '@/components/dropdowns/check-in-actions';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';

type CheckInStatus = 'Completed' | 'Missed' | 'Late' | 'Upcoming';

export type CheckIn = {
  id: string;
  period: string;
  status: CheckInStatus;
  amount: string | null;
  lastCheckInDate: string | null;
  year: string;
};

const checkIns: CheckIn[] = [
  {
    id: '1',
    period: 'January 2026',
    status: 'Completed',
    amount: 'GHS 1,500',
    lastCheckInDate: '17 January, 2026',
    year: '2026',
  },
  {
    id: '2',
    period: 'February 2026',
    status: 'Missed',
    amount: null,
    lastCheckInDate: null,
    year: '2026',
  },
  {
    id: '3',
    period: 'March 2026',
    status: 'Late',
    amount: 'GHS 1,200',
    lastCheckInDate: '1 April, 2026',
    year: '2026',
  },
  {
    id: '4',
    period: 'April 2026',
    status: 'Upcoming',
    amount: null,
    lastCheckInDate: null,
    year: '2026',
  },
];

const statusStyles: Record<CheckInStatus, string> = {
  Completed: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] hover:bg-[#DCFCE7]',
  Missed: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] hover:bg-[#FFE4E6]',
  Late: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] hover:bg-[#FEF3C7]',
  Upcoming: 'bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE] hover:bg-[#DBEAFE]',
};

const columns: ColumnDef<CheckIn>[] = [
  {
    accessorKey: 'period',
    header: 'Period',
    cell: ({ row }) => (
      <span className="font-medium text-[#0A0A0A]">
        {row.getValue('period')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: CheckInStatus = row.getValue('status');
      return (
        <Badge
          className={`text-sm font-medium px-2.5 py-0.5 rounded-md border ${statusStyles[status]}`}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value === '' || row.getValue(id) === value,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="text-[#0A0A0A]">{row.getValue('amount') ?? '-'}</span>
    ),
  },
  {
    accessorKey: 'lastCheckInDate',
    header: 'Last check-in date',
    cell: ({ row }) => (
      <span className="text-[#0A0A0A]">
        {row.getValue('lastCheckInDate') ?? '-'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',

    cell: ({ row }) => <CheckInActions {...row.original} />,
  },
];

export default function CheckIns() {
  return (
    <section className="space-y-4">
      <div className="space-y-1.5 text-[#0A0A0A]">
        <h1 className="font-bold text-2xl">Check-ins</h1>
        <p className="text-sm font-medium">
          Manage and monitor members of this cohort
        </p>
      </div>

      <DataTable
        columns={columns}
        data={checkIns}
        searchKey="period"
        searchPlaceholder="Search..."
        filters={[
          {
            key: 'year',
            label: '2026',
            options: [
              { label: '2024', value: '2024' },
              { label: '2025', value: '2025' },
              { label: '2026', value: '2026' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Completed', value: 'Completed' },
              { label: 'Missed', value: 'Missed' },
              { label: 'Late', value: 'Late' },
              { label: 'Upcoming', value: 'Upcoming' },
            ],
          },
        ]}
        showSearch
        showMetadata={false}
        showPagination
      />
    </section>
  );
}
